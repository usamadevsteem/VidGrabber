import { Link } from "wouter";
import { Download } from "lucide-react";
import { SiX, SiFacebook, SiInstagram } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-16 pb-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-xl">
        <div className="col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Download className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">SnapFetch</span>
          </Link>
          <p className="text-gray-500 mb-6 text-sm">
            The easiest and fastest way to download videos from your favorite social media platforms. High quality, free, and secure.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
              <SiX className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
              <SiFacebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
              <SiInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Downloaders</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/youtube-downloader" className="text-gray-500 hover:text-primary transition-colors">YouTube Downloader</Link></li>
            <li><Link href="/tiktok-downloader" className="text-gray-500 hover:text-primary transition-colors">TikTok Downloader</Link></li>
            <li><Link href="/instagram-downloader" className="text-gray-500 hover:text-primary transition-colors">Instagram Downloader</Link></li>
            <li><Link href="/facebook-downloader" className="text-gray-500 hover:text-primary transition-colors">Facebook Downloader</Link></li>
            <li><Link href="/twitter-downloader" className="text-gray-500 hover:text-primary transition-colors">Twitter Downloader</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-gray-500 hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="text-gray-500 hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="text-gray-500 hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/privacy" className="text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-gray-500 hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/dmca" className="text-gray-500 hover:text-primary transition-colors">DMCA Copyright</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container max-w-screen-xl mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SnapFetch. All rights reserved.</p>
      </div>
    </footer>
  );
}
