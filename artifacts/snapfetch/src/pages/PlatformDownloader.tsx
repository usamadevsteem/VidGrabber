import { useState, type FormEvent } from "react";
import { useAnalyzeUrl } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2, Play } from "lucide-react";

export default function PlatformDownloader({ platform, title, color }: { platform: string, title: string, color?: string }) {
  const [url, setUrl] = useState("");
  const analyze = useAnalyzeUrl();

  const handleDownload = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;
    analyze.mutate({ data: { url } });
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-[calc(100vh-4rem-400px)]">
      <section className="w-full pt-20 pb-24 flex flex-col items-center text-center px-4 relative bg-[#e8fdf4]">
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Download videos from <span className={color}>{platform}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            Paste your {platform} video link below to download it instantly. High quality, watermark-free, and completely free.
          </p>

          <form onSubmit={handleDownload} className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 bg-white p-2 md:p-3 rounded-full shadow-lg border border-gray-100 mb-8">
            <div className="flex-1 flex items-center pl-4">
              <Input 
                type="url" 
                placeholder={`Paste your ${platform} link here...`} 
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

          {analyze.data && (
            <Card className="w-full max-w-3xl bg-white shadow-xl border border-gray-100 text-left animate-in fade-in slide-in-from-bottom-4">
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
    </div>
  );
}