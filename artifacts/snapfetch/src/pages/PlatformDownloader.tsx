import { useState } from "react";
import { useAnalyzeUrl } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Play } from "lucide-react";

export default function PlatformDownloader({ platform, title }: { platform: string, title: string }) {
  const [url, setUrl] = useState("");
  const analyze = useAnalyzeUrl();

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    analyze.mutate({ data: { url } });
  };

  return (
    <div className="container max-w-4xl py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">
          Download high-quality videos from {platform} instantly. No watermarks, completely free.
        </p>
      </div>

      <form onSubmit={handleDownload} className="w-full flex flex-col sm:flex-row gap-4 relative z-10 mb-12">
        <Input 
          type="url" 
          placeholder={`Paste ${platform} video URL here...`} 
          className="h-16 text-lg px-6 rounded-2xl bg-card border-border focus-visible:ring-indigo-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          className="h-16 px-10 text-lg rounded-2xl bg-primary text-primary-foreground transition-all"
          disabled={analyze.isPending}
        >
          {analyze.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
          Download
        </Button>
      </form>

      {analyze.data && (
        <Card className="w-full bg-card/50 backdrop-blur border-border animate-in fade-in slide-in-from-bottom-4">
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
    </div>
  );
}
