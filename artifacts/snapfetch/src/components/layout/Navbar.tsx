import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiYoutube, SiTiktok, SiInstagram, SiFacebook, SiX } from "react-icons/si";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SnapFetch
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/youtube-downloader" className="transition-colors hover:text-foreground/80 text-foreground/60">YouTube</Link>
            <Link href="/tiktok-downloader" className="transition-colors hover:text-foreground/80 text-foreground/60">TikTok</Link>
            <Link href="/instagram-downloader" className="transition-colors hover:text-foreground/80 text-foreground/60">Instagram</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">Blog</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/about">About Us</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
