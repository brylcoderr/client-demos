import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-accent/20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-accent w-full" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="font-display text-3xl text-text-primary flex items-center gap-3">
              <Image src="/logo.jpg" alt="Color Lab 1 Logo" width={48} height={48} className="rounded-full border border-border" />
              Color Lab 1<span className="text-accent">.</span>
            </h3>
            <p className="text-text-muted font-body text-sm max-w-[200px]">
              Color that defines you.
            </p>
            <Badge variant="outline" className="mt-2 border-accent text-accent">
              Asian-Owned
            </Badge>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-eyebrow text-text-primary">Navigation</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-text-muted">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-accent transition-colors">About Helen</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="#gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><a href="https://book.squareup.com/appointments/65fcf06a-2b8e-47d5-8f50-3bfc9ecb746c/location/6KJC3F0ZJYJ7F/services?rwg_token=AE37R_iNQOjFYnq6W8oweF-BotqtgniprDfA-fpKZgFx4MYtnwsGQLRiACmhcD4TMey8MCOuiTrKUEAvFfkXaparbnw-5bbw1A%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Book Online</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-eyebrow text-text-primary">Hours</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-text-muted">
              <li className="flex justify-between max-w-[200px]">
                <span>Mon – Sat</span>
                <span>10am – 7pm</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span>Sunday</span>
                <span className="text-accent">Closed</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-eyebrow text-text-primary">Location & Contact</h4>
            <address className="not-italic flex flex-col gap-3 font-body text-sm text-text-muted">
              <a 
                href="https://maps.google.com/?q=Colonial+Rd,+Bay+Ridge,+Brooklyn,+NY+11209" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors leading-relaxed"
              >
                Colonial Rd,<br />
                Bay Ridge, Brooklyn,<br />
                NY 11209
              </a>
              <a href="tel:9173765481" className="hover:text-accent transition-colors block mt-2">
                917-376-5481
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border font-body text-xs text-text-muted">
          <p>© {new Date().getFullYear()} Color Lab 1 · Bay Ridge, Brooklyn</p>
          <p>Built with precision</p>
        </div>
      </div>
    </footer>
  );
}

