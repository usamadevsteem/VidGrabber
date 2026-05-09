import { useState } from "react";
import { useAnalyzeUrl, useGetDownloadStats } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Play } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const analyze = useAnalyzeUrl();
  const { data: stats } = useGetDownloadStats();

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    analyze.mutate({ data: { url } });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full py-24 md:py-32 lg:py-48 flex flex-col items-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 text-foreground">
          Download any video, <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            instantly.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          The premium AI-powered video downloader for YouTube, TikTok, Instagram, and more. Lightning fast, zero ads, perfectly clean.
        </p>

        <form onSubmit={handleDownload} className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 relative z-10">
          <Input 
            type="url" 
            placeholder="Paste video URL here..." 
            className="h-16 text-lg px-6 rounded-2xl bg-card border-border shadow-xl focus-visible:ring-indigo-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="h-16 px-10 text-lg rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
            disabled={analyze.isPending}
          >
            {analyze.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
            Download
          </Button>
        </form>

        {analyze.data && (
          <Card className="w-full max-w-3xl mt-12 bg-card/50 backdrop-blur border-border animate-in fade-in slide-in-from-bottom-4">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 aspect-video bg-muted rounded-xl overflow-hidden relative">
                {analyze.data.thumbnail ? (
                  <img src={analyze.data.thumbnail} alt={analyze.data.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Play className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3 flex flex-col items-start text-left">
                <h3 className="text-xl font-bold line-clamp-2 mb-2">{analyze.data.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Platform: {analyze.data.platform} • Duration: {analyze.data.duration}</p>
                <div className="flex flex-wrap gap-2 w-full">
                  {analyze.data.formats.map((format, idx) => (
                    <Button key={idx} variant={idx === 0 ? "default" : "secondary"} className="flex-1 sm:flex-none" asChild>
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
      </section>

      {/* Stats */}
      <section className="w-full py-16 border-y bg-muted/30">
        <div className="container max-w-screen-xl flex flex-col md:flex-row justify-center gap-12 md:gap-32 text-center">
          <div>
            <h4 className="text-5xl font-black mb-2">{stats ? (stats.totalDownloads / 1000000).toFixed(1) + 'M+' : '42M+'}</h4>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Videos Downloaded</p>
          </div>
          <div>
            <h4 className="text-5xl font-black mb-2">7+</h4>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Platforms Supported</p>
          </div>
          <div>
            <h4 className="text-5xl font-black mb-2">99%</h4>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Success Rate</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-24 container max-w-screen-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Download in 3 simple steps</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-500 font-bold text-2xl">1</div>
            <h3 className="text-xl font-bold mb-3">Copy URL</h3>
            <p className="text-muted-foreground">Copy the video link from YouTube, TikTok, Instagram, or any other supported platform.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 font-bold text-2xl">2</div>
            <h3 className="text-xl font-bold mb-3">Paste Link</h3>
            <p className="text-muted-foreground">Paste the link into the input field above and hit the download button.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500 font-bold text-2xl">3</div>
            <h3 className="text-xl font-bold mb-3">Save File</h3>
            <p className="text-muted-foreground">Choose your preferred quality and format, then save the video to your device.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
