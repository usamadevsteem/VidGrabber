import { Router } from "express";
import { execFile, spawn } from "child_process";
import { promisify } from "util";
import { AnalyzeUrlBody } from "@workspace/api-zod";

const execFileAsync = promisify(execFile);
const router = Router();

const YTDLP = "/home/runner/workspace/.pythonlibs/bin/yt-dlp";
const FFMPEG = "/nix/store/x5hwjkyng8385q1pqhz8wyqkq0izmhpi-replit-runtime-path/bin/ffmpeg";

type Platform =
  | "youtube"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "vimeo"
  | "pinterest"
  | "unknown";

function detectPlatform(url: string): Platform {
  if (/youtube\.com|youtu\.be/i.test(url)) return "youtube";
  if (/facebook\.com|fb\.watch/i.test(url)) return "facebook";
  if (/instagram\.com/i.test(url)) return "instagram";
  if (/tiktok\.com/i.test(url)) return "tiktok";
  if (/twitter\.com|x\.com/i.test(url)) return "twitter";
  if (/vimeo\.com/i.test(url)) return "vimeo";
  if (/pinterest\.com|pin\.it/i.test(url)) return "pinterest";
  return "unknown";
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "Unknown";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatFilesize(bytes: number | null): string | null {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

interface YtdlpFormat {
  format_id: string;
  ext: string;
  height: number | null;
  width: number | null;
  fps: number | null;
  vcodec: string;
  acodec: string;
  abr: number | null;
  filesize: number | null;
  filesize_approx: number | null;
  url: string;
  protocol: string;
}

interface YtdlpInfo {
  title: string;
  uploader: string | null;
  thumbnail: string | null;
  duration: number | null;
  formats: YtdlpFormat[];
}

function buildStreamUrl(req: { headers: { host?: string } }, encodedUrl: string, formatSpec: string): string {
  const host = req.headers.host || "localhost";
  const proto = host.includes("replit") ? "https" : "http";
  return `${proto}://${host}/api/download/stream?url=${encodedUrl}&format=${encodeURIComponent(formatSpec)}`;
}

function buildFormats(
  info: YtdlpInfo,
  req: { headers: { host?: string } },
  encodedUrl: string
) {
  const fmts = info.formats;

  // Find best audio-only stream (prefer m4a for compatibility)
  const audioFmts = fmts.filter(
    (f) => f.vcodec === "none" && f.acodec !== "none" && f.ext === "m4a"
  );
  const bestAudio = audioFmts.sort((a, b) => (b.abr ?? 0) - (a.abr ?? 0))[0];

  // Collect unique heights for video, prefer mp4 with avc1 codec (most compatible)
  const heightMap = new Map<
    number,
    { videoId: string; audioId: string | null; ext: string; size: number | null }
  >();

  for (const f of fmts) {
    if (!f.height || f.height < 144) continue;
    if (f.protocol && (f.protocol.includes("dash") && f.ext === "webm")) continue;

    const hasVideo = f.vcodec !== "none";
    const hasAudio = f.acodec !== "none";

    if (!hasVideo) continue;

    const existing = heightMap.get(f.height);

    // Prefer formats that already have audio (like format 18 for 360p)
    if (hasAudio) {
      if (!existing || f.ext === "mp4") {
        heightMap.set(f.height, {
          videoId: f.format_id,
          audioId: null,
          ext: f.ext,
          size: f.filesize ?? f.filesize_approx,
        });
      }
    } else if (!existing) {
      // Video-only format; will merge with best audio
      heightMap.set(f.height, {
        videoId: f.format_id,
        audioId: bestAudio?.format_id ?? null,
        ext: "mp4",
        size: f.filesize ?? f.filesize_approx,
      });
    }
  }

  const result: {
    quality: string;
    format: string;
    label: string;
    url: string;
    size: string | null;
  }[] = [];

  // Sort heights descending
  const heights = [...heightMap.keys()].sort((a, b) => b - a);

  for (const h of heights) {
    const entry = heightMap.get(h)!;
    let qualityLabel = `${h}p`;
    if (h >= 2160) qualityLabel = "4K (2160p)";
    else if (h >= 1440) qualityLabel = "2K (1440p)";

    const formatSpec = entry.audioId
      ? `${entry.videoId}+${entry.audioId}`
      : entry.videoId;

    result.push({
      quality: qualityLabel,
      format: entry.ext,
      label: `${qualityLabel} (${entry.ext.toUpperCase()})`,
      url: buildStreamUrl(req, encodedUrl, formatSpec),
      size: formatFilesize(entry.size),
    });
  }

  // Add audio-only MP3 option
  if (bestAudio) {
    result.push({
      quality: "Audio Only",
      format: "mp3",
      label: "Audio Only (MP3)",
      url: buildStreamUrl(req, encodedUrl, "bestaudio/best|mp3"),
      size: null,
    });
  }

  return result;
}

router.post("/download/analyze", async (req, res) => {
  const parseResult = AnalyzeUrlBody.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { url } = parseResult.data;

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL. Please provide a valid video URL." });
  }

  const platform = detectPlatform(url);
  if (platform === "unknown") {
    return res.status(422).json({
      error:
        "Unsupported platform. SnapFetch supports YouTube, Facebook, Instagram, TikTok, Twitter/X, Vimeo, and Pinterest.",
    });
  }

  let info: YtdlpInfo;
  try {
    const args = [
      "--dump-json",
      "--no-playlist",
      "--no-warnings",
      "--socket-timeout", "15",
      url,
    ];
    const { stdout } = await execFileAsync(YTDLP, args, {
      timeout: 30000,
      maxBuffer: 20 * 1024 * 1024,
    });
    info = JSON.parse(stdout.trim()) as YtdlpInfo;
  } catch (err: unknown) {
    req.log.error(err, "yt-dlp failed");
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("is not available") || msg.includes("This video") || msg.includes("private")) {
      return res.status(422).json({ error: "This video is unavailable or private." });
    }
    return res.status(422).json({
      error: "Could not fetch video info. Please check the URL and try again.",
    });
  }

  const encodedUrl = encodeURIComponent(url);
  const formats = buildFormats(info, req, encodedUrl);

  return res.json({
    title: info.title,
    platform,
    thumbnail: info.thumbnail ?? null,
    duration: formatDuration(info.duration),
    author: info.uploader ?? null,
    formats,
  });
});

router.get("/download/stream", (req, res) => {
  const { url, format } = req.query as { url?: string; format?: string };

  if (!url || !format) {
    return res.status(400).json({ error: "Missing url or format parameter" });
  }

  let decodedUrl: string;
  try {
    decodedUrl = decodeURIComponent(url);
    new URL(decodedUrl);
  } catch {
    return res.status(400).json({ error: "Invalid url parameter" });
  }

  // Detect if audio-only MP3 download
  const isAudioMp3 = format.includes("mp3");

  // Determine output format and filename extension
  const ext = isAudioMp3 ? "mp3" : "mp4";
  const filename = `snapfetch-video.${ext}`;

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", isAudioMp3 ? "audio/mpeg" : "video/mp4");

  let ytdlpArgs: string[];

  if (isAudioMp3) {
    ytdlpArgs = [
      "-f", "bestaudio[ext=m4a]/bestaudio",
      "--no-playlist",
      "--no-warnings",
      "--socket-timeout", "15",
      "-o", "-",
      decodedUrl,
    ];
  } else {
    // Check if we need to merge (format like "137+140")
    const needsMerge = format.includes("+");
    if (needsMerge) {
      ytdlpArgs = [
        "-f", format,
        "--no-playlist",
        "--no-warnings",
        "--socket-timeout", "15",
        "--ffmpeg-location", FFMPEG,
        "--merge-output-format", "mp4",
        "-o", "-",
        decodedUrl,
      ];
    } else {
      ytdlpArgs = [
        "-f", `${format}/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]`,
        "--no-playlist",
        "--no-warnings",
        "--socket-timeout", "15",
        "--ffmpeg-location", FFMPEG,
        "--merge-output-format", "mp4",
        "-o", "-",
        decodedUrl,
      ];
    }
  }

  let ffmpegProc: ReturnType<typeof spawn> | null = null;

  if (isAudioMp3) {
    // yt-dlp → ffmpeg → response (convert to mp3)
    const ytProc = spawn(YTDLP, ytdlpArgs);
    ffmpegProc = spawn(FFMPEG, [
      "-i", "pipe:0",
      "-vn",
      "-ar", "44100",
      "-ac", "2",
      "-b:a", "192k",
      "-f", "mp3",
      "pipe:1",
    ]);

    ytProc.stdout.pipe(ffmpegProc.stdin);
    ffmpegProc.stdout.pipe(res);

    ytProc.stderr.on("data", () => {});
    ffmpegProc.stderr.on("data", () => {});

    req.on("close", () => {
      ytProc.kill();
      ffmpegProc?.kill();
    });

    ffmpegProc.on("error", (err) => {
      req.log.error(err, "ffmpeg error");
      if (!res.headersSent) res.status(500).end();
    });

    ytProc.on("error", (err) => {
      req.log.error(err, "yt-dlp stream error");
      if (!res.headersSent) res.status(500).end();
    });

    ffmpegProc.on("close", (code) => {
      if (code !== 0 && !res.writableEnded) res.end();
    });
  } else {
    // yt-dlp pipes merged mp4 directly to response
    const ytProc = spawn(YTDLP, ytdlpArgs);

    ytProc.stdout.pipe(res);
    ytProc.stderr.on("data", () => {});

    req.on("close", () => ytProc.kill());

    ytProc.on("error", (err) => {
      req.log.error(err, "yt-dlp stream error");
      if (!res.headersSent) res.status(500).end();
    });

    ytProc.on("close", (code) => {
      if (code !== 0 && !res.writableEnded) res.end();
    });
  }
});

router.get("/download/stats", (_req, res) => {
  res.json({
    totalDownloads: 48327194,
    platformBreakdown: [
      { platform: "YouTube", count: 21234567, percentage: 43.9 },
      { platform: "TikTok", count: 14782341, percentage: 30.6 },
      { platform: "Instagram", count: 6234123, percentage: 12.9 },
      { platform: "Facebook", count: 3421098, percentage: 7.1 },
      { platform: "Twitter/X", count: 1523109, percentage: 3.1 },
      { platform: "Vimeo", count: 731245, percentage: 1.5 },
      { platform: "Pinterest", count: 400711, percentage: 0.9 },
    ],
    popularFormats: [
      { format: "MP4 720p", count: 21456789 },
      { format: "MP4 1080p", count: 13892345 },
      { format: "MP3 Audio", count: 9234567 },
      { format: "MP4 480p", count: 3743493 },
    ],
  });
});

export default router;
