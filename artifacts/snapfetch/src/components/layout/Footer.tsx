import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16 bg-background">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SnapFetch</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The fastest, cleanest way to download videos from any social platform. Premium SaaS quality, completely free.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-foreground">Platforms</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/youtube-downloader" className="hover:text-foreground">YouTube Downloader</Link></li>
            <li><Link href="/facebook-downloader" className="hover:text-foreground">Facebook Downloader</Link></li>
            <li><Link href="/instagram-downloader" className="hover:text-foreground">Instagram Downloader</Link></li>
            <li><Link href="/tiktok-downloader" className="hover:text-foreground">TikTok Downloader</Link></li>
            <li><Link href="/twitter-downloader" className="hover:text-foreground">Twitter/X Downloader</Link></li>
            <li><Link href="/vimeo-downloader" className="hover:text-foreground">Vimeo Downloader</Link></li>
            <li><Link href="/pinterest-downloader" className="hover:text-foreground">Pinterest Downloader</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-foreground">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-foreground">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            <li><Link href="/dmca" className="hover:text-foreground">DMCA</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SnapFetch. All rights reserved.</p>
      </div>
    </footer>
  );
}
