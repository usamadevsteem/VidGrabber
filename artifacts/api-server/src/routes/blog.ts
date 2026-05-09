import { Router } from "express";
import { ListBlogPostsQueryParams, GetBlogPostParams } from "@workspace/api-zod";

const router = Router();

const BLOG_POSTS = [
  {
    id: 1,
    slug: "how-to-download-youtube-videos-free",
    title: "How to Download YouTube Videos for Free in 2025",
    excerpt:
      "Learn how to save YouTube videos for offline viewing in HD quality — step-by-step guide for any device.",
    content: `<h2>Why Download YouTube Videos?</h2>
<p>Whether you're preparing for a long flight, studying offline, or simply want to keep a backup of your favorite content, downloading YouTube videos gives you the freedom to watch on your own terms.</p>
<h2>Step-by-Step: Download YouTube Videos with SnapFetch</h2>
<ol>
<li><strong>Copy the video URL</strong> from your browser's address bar or the YouTube share button.</li>
<li><strong>Paste the URL</strong> into the SnapFetch input field on the homepage.</li>
<li><strong>Click "Download"</strong> and wait a moment for the analysis to complete.</li>
<li><strong>Choose your quality</strong> — from 4K Ultra HD to MP3 audio-only.</li>
<li><strong>Save the file</strong> to your device.</li>
</ol>
<h2>Supported Formats</h2>
<p>SnapFetch supports MP4 video in 1080p, 720p, 480p, and 360p — plus MP3 audio extraction for YouTube. All downloads are fast and unlimited.</p>
<h2>Tips for Best Results</h2>
<ul>
<li>Use the direct video URL, not playlist links, for the best compatibility.</li>
<li>For music, use the Audio Only (MP3) option to save storage.</li>
<li>HD downloads require more storage — ensure you have space.</li>
</ul>`,
    category: "YouTube Tips",
    publishedAt: "2025-04-15",
    readTime: "5 min read",
    coverImage: "https://placehold.co/800x450/FF0000/ffffff?text=YouTube+Downloader+Guide",
    author: "SnapFetch Team",
  },
  {
    id: 2,
    slug: "download-tiktok-videos-without-watermark",
    title: "How to Download TikTok Videos Without Watermark",
    excerpt:
      "Remove the TikTok watermark and save videos in full HD — completely free with SnapFetch.",
    content: `<h2>The TikTok Watermark Problem</h2>
<p>TikTok adds its watermark to every saved video, which can be distracting when you want to repurpose content or save a clean copy. SnapFetch solves this by fetching the original video source directly.</p>
<h2>How to Download TikTok Videos Without Watermark</h2>
<ol>
<li>Open TikTok and find the video you want to download.</li>
<li>Tap the Share button and select "Copy Link".</li>
<li>Paste the link into SnapFetch's TikTok downloader page.</li>
<li>Select your preferred quality (HD recommended).</li>
<li>Tap the download button and save to your gallery.</li>
</ol>
<h2>Why Use SnapFetch for TikTok?</h2>
<p>SnapFetch fetches TikTok videos from the original source, bypassing the watermark entirely. No registration required, no app to install.</p>`,
    category: "TikTok Guides",
    publishedAt: "2025-04-20",
    readTime: "4 min read",
    coverImage: "https://placehold.co/800x450/010101/ffffff?text=TikTok+No+Watermark",
    author: "SnapFetch Team",
  },
  {
    id: 3,
    slug: "save-instagram-reels-offline",
    title: "How to Save Instagram Reels for Offline Viewing",
    excerpt:
      "Instagram doesn't let you download Reels natively. Here's how to save them to your device with SnapFetch.",
    content: `<h2>Why Can't I Download Instagram Reels Directly?</h2>
<p>Instagram restricts native downloads to protect creator content. However, SnapFetch provides a legal way to save Reels you have permission to download for personal use.</p>
<h2>Steps to Download Instagram Reels</h2>
<ol>
<li>Open Instagram and navigate to the Reel you want to save.</li>
<li>Tap the three-dot menu and select "Copy Link".</li>
<li>Open SnapFetch and go to the Instagram Downloader page.</li>
<li>Paste the link and click "Analyze".</li>
<li>Choose your format and download.</li>
</ol>
<h2>Supported Instagram Content</h2>
<p>SnapFetch supports Reels, videos in feeds, and IGTV videos. Stories and private content cannot be downloaded.</p>`,
    category: "Instagram Tutorials",
    publishedAt: "2025-04-25",
    readTime: "4 min read",
    coverImage: "https://placehold.co/800x450/E1306C/ffffff?text=Instagram+Reels+Guide",
    author: "SnapFetch Team",
  },
  {
    id: 4,
    slug: "best-video-quality-settings-for-downloads",
    title: "Which Video Quality Should You Download? A Complete Guide",
    excerpt:
      "1080p, 720p, or 4K — choosing the right video quality depends on your device and storage. Here's everything you need to know.",
    content: `<h2>Understanding Video Quality</h2>
<p>Video quality (resolution) determines how sharp and detailed a video appears. Here's a quick breakdown:</p>
<ul>
<li><strong>4K (2160p)</strong> — Best for large screens and future-proofing. Requires ~4GB per hour.</li>
<li><strong>1080p Full HD</strong> — Ideal for most uses. Great quality, manageable file size (~1.5GB/hr).</li>
<li><strong>720p HD</strong> — Good balance of quality and size (~700MB/hr). Best for mobile.</li>
<li><strong>480p SD</strong> — Low storage, adequate for small screens (~300MB/hr).</li>
<li><strong>360p</strong> — Minimal storage, suitable for audio-focused content.</li>
</ul>
<h2>Which Should You Choose?</h2>
<p>For most users, 720p or 1080p is the sweet spot. If you're watching on a phone, 720p is more than enough. For big-screen playback, go with 1080p or 4K.</p>`,
    category: "Video Downloading Guides",
    publishedAt: "2025-05-01",
    readTime: "6 min read",
    coverImage: "https://placehold.co/800x450/6366F1/ffffff?text=Video+Quality+Guide",
    author: "SnapFetch Team",
  },
  {
    id: 5,
    slug: "download-facebook-videos-2025",
    title: "The Easiest Way to Download Facebook Videos in 2025",
    excerpt:
      "Facebook's built-in save feature doesn't actually download videos. Learn how to save them for real with SnapFetch.",
    content: `<h2>Facebook's Save Feature vs. Downloading</h2>
<p>Facebook's "Save" feature bookmarks content within the app — it doesn't download the video to your device. SnapFetch actually saves the video file so you can watch it anywhere, even without internet.</p>
<h2>How to Download Facebook Videos</h2>
<ol>
<li>Find the Facebook video you want to download.</li>
<li>Click the three-dot menu and select "Copy link".</li>
<li>Paste the link into SnapFetch.</li>
<li>Choose HD or SD quality.</li>
<li>Save to your device.</li>
</ol>
<h2>Facebook Reels and Watch Videos</h2>
<p>SnapFetch supports standard Facebook videos, Facebook Reels, and Watch content. Live videos that are archived are also supported.</p>`,
    category: "Facebook Tricks",
    publishedAt: "2025-05-05",
    readTime: "4 min read",
    coverImage: "https://placehold.co/800x450/1877F2/ffffff?text=Facebook+Video+Download",
    author: "SnapFetch Team",
  },
  {
    id: 6,
    slug: "youtube-to-mp3-converter-guide",
    title: "Convert YouTube Videos to MP3: The Complete Guide",
    excerpt:
      "Extract audio from any YouTube video and save it as a high-quality MP3 file — for podcasts, music, and more.",
    content: `<h2>Why Convert YouTube to MP3?</h2>
<p>YouTube is home to millions of songs, podcasts, lectures, and audiobooks. Converting to MP3 lets you listen without internet, save battery, and use your own media player.</p>
<h2>How to Convert YouTube to MP3 with SnapFetch</h2>
<ol>
<li>Copy the YouTube video URL.</li>
<li>Paste it into SnapFetch.</li>
<li>When the formats appear, select "Audio Only (MP3)".</li>
<li>Click download and save the MP3 file.</li>
</ol>
<h2>Best Practices</h2>
<ul>
<li>Only convert content you have rights to use.</li>
<li>For podcasts, check if the creator offers an official RSS feed first.</li>
<li>SnapFetch extracts audio at the best available quality from the source.</li>
</ul>`,
    category: "YouTube Tips",
    publishedAt: "2025-05-08",
    readTime: "5 min read",
    coverImage: "https://placehold.co/800x450/FF0000/ffffff?text=YouTube+to+MP3+Guide",
    author: "SnapFetch Team",
  },
];

router.get("/blog/posts", (req, res) => {
  const parseResult = ListBlogPostsQueryParams.safeParse(req.query);
  const params = parseResult.success ? parseResult.data : {};

  let posts = [...BLOG_POSTS];

  if (params.category) {
    posts = posts.filter(
      (p) => p.category.toLowerCase() === params.category!.toLowerCase()
    );
  }

  const limit = params.limit ?? 6;
  const offset = params.offset ?? 0;

  const sliced = posts.slice(offset, offset + limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    publishedAt: p.publishedAt,
    readTime: p.readTime,
    coverImage: p.coverImage ?? null,
    author: p.author,
  }));

  res.json(sliced);
});

router.get("/blog/posts/:slug", (req, res) => {
  const parseResult = GetBlogPostParams.safeParse(req.params);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid slug" });
  }

  const { slug } = parseResult.data;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  return res.json({
    ...post,
    coverImage: post.coverImage ?? null,
  });
});

export default router;
