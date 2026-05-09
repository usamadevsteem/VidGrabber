import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import PlatformDownloader from "@/pages/PlatformDownloader";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/youtube-downloader">
            {() => <PlatformDownloader platform="youtube" title="YouTube Video Downloader" />}
          </Route>
          <Route path="/facebook-downloader">
            {() => <PlatformDownloader platform="facebook" title="Facebook Video Downloader" />}
          </Route>
          <Route path="/instagram-downloader">
            {() => <PlatformDownloader platform="instagram" title="Instagram Video Downloader" />}
          </Route>
          <Route path="/tiktok-downloader">
            {() => <PlatformDownloader platform="tiktok" title="TikTok Video Downloader" />}
          </Route>
          <Route path="/twitter-downloader">
            {() => <PlatformDownloader platform="twitter" title="Twitter/X Video Downloader" />}
          </Route>
          <Route path="/vimeo-downloader">
            {() => <PlatformDownloader platform="vimeo" title="Vimeo Video Downloader" />}
          </Route>
          <Route path="/pinterest-downloader">
            {() => <PlatformDownloader platform="pinterest" title="Pinterest Video Downloader" />}
          </Route>
          
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/contact" component={Contact} />
          
          <Route path="/privacy">{() => <Legal type="privacy" />}</Route>
          <Route path="/terms">{() => <Legal type="terms" />}</Route>
          <Route path="/dmca">{() => <Legal type="dmca" />}</Route>
          <Route path="/about">{() => <Legal type="about" />}</Route>

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
