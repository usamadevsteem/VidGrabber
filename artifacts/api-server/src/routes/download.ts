import { Router } from "express";
import {
  AnalyzeUrlBody,
} from "@workspace/api-zod";

const router = Router();

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

function getFormatsForPlatform(platform: Platform, baseUrl: string) {
  const formats: {
    quality: string;
    format: string;
    label: string;
    url: string;
    size: string | null;
  }[] = [];

  if (platform === "youtube") {
    formats.push(
      { quality: "1080p", format: "mp4", label: "Full HD 1080p (MP4)", url: baseUrl, size: "~120 MB" },
      { quality: "720p", format: "mp4", label: "HD 720p (MP4)", url: baseUrl, size: "~65 MB" },
      { quality: "480p", format: "mp4", label: "SD 480p (MP4)", url: baseUrl, size: "~35 MB" },
      { quality: "360p", format: "mp4", label: "Low 360p (MP4)", url: baseUrl, size: "~18 MB" },
      { quality: "Audio Only", format: "mp3", label: "Audio Only (MP3)", url: baseUrl, size: "~4 MB" }
    );
  } else if (platform === "tiktok") {
    formats.push(
      { quality: "1080p", format: "mp4", label: "HD 1080p No Watermark (MP4)", url: baseUrl, size: "~15 MB" },
      { quality: "720p", format: "mp4", label: "720p No Watermark (MP4)", url: baseUrl, size: "~8 MB" },
      { quality: "Audio Only", format: "mp3", label: "Audio Only (MP3)", url: baseUrl, size: "~2 MB" }
    );
  } else if (platform === "instagram") {
    formats.push(
      { quality: "1080p", format: "mp4", label: "Full HD (MP4)", url: baseUrl, size: "~25 MB" },
      { quality: "720p", format: "mp4", label: "HD 720p (MP4)", url: baseUrl, size: "~12 MB" },
      { quality: "Audio Only", format: "mp3", label: "Audio (MP3)", url: baseUrl, size: "~3 MB" }
    );
  } else if (platform === "facebook") {
    formats.push(
      { quality: "HD", format: "mp4", label: "HD Quality (MP4)", url: baseUrl, size: "~55 MB" },
      { quality: "SD", format: "mp4", label: "SD Quality (MP4)", url: baseUrl, size: "~22 MB" },
      { quality: "Audio Only", format: "mp3", label: "Audio Only (MP3)", url: baseUrl, size: "~4 MB" }
    );
  } else if (platform === "twitter") {
    formats.push(
      { quality: "720p", format: "mp4", label: "HD 720p (MP4)", url: baseUrl, size: "~18 MB" },
      { quality: "480p", format: "mp4", label: "SD 480p (MP4)", url: baseUrl, size: "~9 MB" },
      { quality: "360p", format: "mp4", label: "Low 360p (MP4)", url: baseUrl, size: "~5 MB" }
    );
  } else if (platform === "vimeo") {
    formats.push(
      { quality: "4K", format: "mp4", label: "4K Ultra HD (MP4)", url: baseUrl, size: "~650 MB" },
      { quality: "1080p", format: "mp4", label: "Full HD 1080p (MP4)", url: baseUrl, size: "~200 MB" },
      { quality: "720p", format: "mp4", label: "HD 720p (MP4)", url: baseUrl, size: "~90 MB" },
      { quality: "Audio Only", format: "mp3", label: "Audio Only (MP3)", url: baseUrl, size: "~8 MB" }
    );
  } else if (platform === "pinterest") {
    formats.push(
      { quality: "HD", format: "mp4", label: "HD Quality (MP4)", url: baseUrl, size: "~20 MB" },
      { quality: "SD", format: "mp4", label: "SD Quality (MP4)", url: baseUrl, size: "~8 MB" }
    );
  } else {
    formats.push(
      { quality: "720p", format: "mp4", label: "HD 720p (MP4)", url: baseUrl, size: null },
      { quality: "360p", format: "mp4", label: "SD 360p (MP4)", url: baseUrl, size: null }
    );
  }

  return formats;
}

const PLATFORM_METADATA: Record<
  Platform,
  { title: string; author: string; thumbnail: string; duration: string }
> = {
  youtube: {
    title: "Sample YouTube Video",
    author: "YouTube Creator",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "3:33",
  },
  facebook: {
    title: "Facebook Video",
    author: "Facebook User",
    thumbnail: "https://placehold.co/640x360/1877F2/ffffff?text=Facebook+Video",
    duration: "2:15",
  },
  instagram: {
    title: "Instagram Reel",
    author: "@instagram_creator",
    thumbnail: "https://placehold.co/640x640/E1306C/ffffff?text=Instagram+Reel",
    duration: "0:30",
  },
  tiktok: {
    title: "TikTok Video",
    author: "@tiktok_creator",
    thumbnail: "https://placehold.co/400x711/010101/ffffff?text=TikTok+Video",
    duration: "0:45",
  },
  twitter: {
    title: "Twitter/X Video",
    author: "@twitter_user",
    thumbnail: "https://placehold.co/640x360/1DA1F2/ffffff?text=Twitter+Video",
    duration: "1:00",
  },
  vimeo: {
    title: "Vimeo Video",
    author: "Vimeo Creator",
    thumbnail: "https://placehold.co/640x360/1AB7EA/ffffff?text=Vimeo+Video",
    duration: "5:20",
  },
  pinterest: {
    title: "Pinterest Video Pin",
    author: "Pinterest User",
    thumbnail: "https://placehold.co/640x960/E60023/ffffff?text=Pinterest+Video",
    duration: "0:20",
  },
  unknown: {
    title: "Video",
    author: "Unknown",
    thumbnail: "https://placehold.co/640x360/6366F1/ffffff?text=Video",
    duration: "Unknown",
  },
};

router.post("/download/analyze", (req, res) => {
  const parseResult = AnalyzeUrlBody.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { url } = parseResult.data;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
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

  const meta = PLATFORM_METADATA[platform];
  const formats = getFormatsForPlatform(platform, parsedUrl.href);

  return res.json({
    title: meta.title,
    platform,
    thumbnail: meta.thumbnail,
    duration: meta.duration,
    author: meta.author,
    formats,
  });
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
