import { useState, type FormEvent } from "react";
import { useAnalyzeUrl, useGetDownloadStats } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Play, Zap, Monitor, Infinity as InfinityIcon, Globe, Music, Shield, Plus, Check } from "lucide-react";
import { SiYoutube, SiTiktok, SiInstagram, SiFacebook, SiX, SiVimeo, SiPinterest } from "react-icons/si";
import { Link } from "wouter";

export default function Home() {
  const [url, setUrl] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const analyze = useAnalyzeUrl();
  const { data: stats } = useGetDownloadStats();

  const handleDownload = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;
    analyze.mutate({ data: { url } });
  };

  const platforms = [
    { icon: <SiYoutube className="w-4 h-4 text-red-500" />, name: "YouTube", path: "/youtube-downloader" },
    { icon: <SiTiktok className="w-4 h-4 text-black" />, name: "TikTok", path: "/tiktok-downloader" },
    { icon: <SiInstagram className="w-4 h-4 text-pink-500" />, name: "Instagram", path: "/instagram-downloader" },
    { icon: <SiFacebook className="w-4 h-4 text-blue-600" />, name: "Facebook", path: "/facebook-downloader" },
    { icon: <SiX className="w-4 h-4 text-black" />, name: "Twitter/X", path: "/twitter-downloader" },
    { icon: <SiVimeo className="w-4 h-4 text-blue-400" />, name: "Vimeo", path: "/vimeo-downloader" },
    { icon: <SiPinterest className="w-4 h-4 text-red-600" />, name: "Pinterest", path: "/pinterest-downloader" },
  ];

  const faqs = [
    { q: "Is SnapFetch completely free?", a: "Yes, SnapFetch is 100% free to use. There are no hidden fees, no subscriptions, and no limits on how many videos you can download." },
    { q: "Do I need to install any software?", a: "No installation required! SnapFetch works entirely in your web browser. Just paste the link and download." },
    { q: "Are there any watermarks on the downloaded videos?", a: "No, all videos downloaded through SnapFetch are completely watermark-free, preserving the original quality." },
    { q: "What video formats are supported?", a: "We support downloading in MP4 format for videos (up to 4K resolution) and MP3 format for audio extraction." },
    { q: "Can I download videos on my mobile device?", a: "Absolutely. SnapFetch is fully responsive and works perfectly on iOS and Android devices." },
    { q: "Is it safe to use SnapFetch?", a: "Yes, it's completely safe. We do not track your download history, and we don't store copies of the videos on our servers." },
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-24 md:pt-32 md:pb-40 flex flex-col items-center text-center px-4 relative bg-[#e8fdf4]">
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Lightning fast HD downloads
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Download videos from <span className="text-red-500">YouTube</span>, <span className="text-gray-900">TikTok</span>, <span className="text-pink-500">Instagram</span> & more — free.
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            Paste any video link below. SnapFetch instantly fetches HD MP4 files and MP3 audio in seconds. No signup. No watermarks. No limits.
          </p>

          <form onSubmit={handleDownload} className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 bg-white p-2 md:p-3 rounded-full shadow-lg border border-gray-100 mb-8">
            <div className="flex-1 flex items-center pl-4">
              <Input 
                type="url" 
                placeholder="Paste your video link here..." 
                className="w-full h-14 border-0 focus-visible:ring-0 text-lg shadow-none px-2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-md w-full sm:w-auto"
              disabled={analyze.isPending}
            >
              {analyze.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
              Download
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((p, i) => (
              <div key={i} className="flex items-center bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm text-sm font-medium">
                {p.icon} <span className="ml-2 text-gray-700">{p.name}</span>
              </div>
            ))}
          </div>

          {analyze.data && (
            <Card className="w-full max-w-3xl mt-12 bg-white shadow-xl border border-gray-100 text-left animate-in fade-in slide-in-from-bottom-4">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                  {analyze.data.thumbnail ? (
                    <img src={analyze.data.thumbnail} alt={analyze.data.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="w-full md:w-2/3 flex flex-col items-start">
                  <h3 className="text-lg font-bold line-clamp-2 mb-2 text-gray-900">{analyze.data.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{analyze.data.platform} • {analyze.data.duration}</p>
                  <div className="flex flex-wrap gap-2 w-full">
                    {analyze.data.formats.map((format, idx) => (
                      <Button key={idx} variant={idx === 0 ? "default" : "outline"} className={`flex-1 sm:flex-none ${idx === 0 ? 'bg-primary hover:bg-primary/90 text-white' : ''}`} asChild>
                        <a href={format.url} target="_blank" rel="noreferrer">
                          {format.label} ({format.quality})
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Stats Row */}
      <section className="w-full py-12 bg-white border-b border-gray-100">
        <div className="container max-w-screen-xl flex flex-wrap justify-center gap-12 md:gap-24 text-center px-4">
          <div>
            <h4 className="text-4xl font-black text-gray-900 mb-1">{stats ? (stats.totalDownloads / 1000000).toFixed(1) + 'M+' : '42M+'}</h4>
            <p className="text-gray-500 font-medium">Videos Downloaded</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-gray-900 mb-1">45+</h4>
            <p className="text-gray-500 font-medium">Supported Sites</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-gray-900 mb-1">0</h4>
            <p className="text-gray-500 font-medium">Ads & Watermarks</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-white">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Everything you need, nothing you don't</h2>
            <p className="text-xl text-gray-600">Built for speed, privacy, and quality. The cleanest way to save videos online.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Lightning fast", desc: "Our global edge CDN ensures your downloads start instantly and finish in seconds.", icon: <Zap className="w-6 h-6 text-primary" /> },
              { title: "HD & 4K quality", desc: "Download videos in their original resolution, from 720p all the way up to 4K.", icon: <Monitor className="w-6 h-6 text-primary" /> },
              { title: "Unlimited & free", desc: "Download as many videos as you want. No signup, no daily limits, completely free.", icon: <InfinityIcon className="w-6 h-6 text-primary" /> },
              { title: "Works everywhere", desc: "Compatible with Chrome, Safari, Firefox, Edge, and works flawlessly on mobile.", icon: <Globe className="w-6 h-6 text-primary" /> },
              { title: "MP3 extraction", desc: "Just want the audio? We can instantly extract high-quality MP3s from any video.", icon: <Music className="w-6 h-6 text-primary" /> },
              { title: "Private & secure", desc: "We don't track your downloads, log your activity, or store your videos on our servers.", icon: <Shield className="w-6 h-6 text-primary" /> },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary/20 transition-colors">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-24 bg-gray-50 border-y border-gray-100">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Save any video in 4 simple steps</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Copy link", desc: "Find the video you want and copy its URL." },
              { step: 2, title: "Paste URL", desc: "Paste the link into our search box above." },
              { step: 3, title: "Pick quality", desc: "Select MP4 or MP3 and your preferred quality." },
              { step: 4, title: "Save video", desc: "Click download and save it to your device." },
            ].map((step) => (
              <div key={step.step} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="text-6xl font-black text-gray-100 absolute -right-2 -top-2 select-none">{step.step}</div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-6 relative z-10">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-600 relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="w-full py-24 bg-white">
        <div className="container max-w-screen-xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Built for every social network</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">SnapFetch officially supports over 45+ platforms. Here are the most popular ones.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((p, i) => (
              <Link key={i} href={p.path} className="group block">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary hover:shadow-md transition-all">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <div className="scale-150">{p.icon}</div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-gray-500">Download videos & MP3s</p>
                </div>
              </Link>
            ))}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">And 30+ more</h3>
              <p className="text-sm text-gray-500">Just try pasting the link!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-gray-50 border-t border-gray-100">
        <div className="container max-w-3xl px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span className="font-bold text-lg text-gray-900">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${expandedFaq === i ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}>
                    <Plus className={`w-5 h-5 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`} />
                  </div>
                </button>
                <div className={`px-6 pb-5 text-gray-600 overflow-hidden transition-all ${expandedFaq === i ? 'block' : 'hidden'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4">
        <div className="container max-w-5xl bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">Ready to download your first video?</h2>
          <p className="text-primary-foreground/90 text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Join millions of users who trust SnapFetch for their video downloading needs. It's fast, free, and incredibly easy to use.
          </p>
          <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-white text-primary hover:bg-gray-50 font-bold relative z-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Try it now for free
          </Button>
        </div>
      </section>
    </div>
  );
}
