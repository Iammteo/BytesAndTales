import Link from 'next/link';
import { site, buildWhatsAppGeneralUrl } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-ink text-cream py-24 relative overflow-hidden">
      <div className="wrap">
        <div className="text-center mb-12 pb-12 border-b border-cream/15">
          <h2 className="font-display text-7xl md:text-[160px] leading-none font-light tracking-tight">
            Bytes <em className="italic text-orange">&amp;</em> Tales<span className="text-orange">.</span>
          </h2>
          <p className="font-serif italic text-base md:text-lg mt-8 text-cream/70">
            A Manchester pastry house writing little stories in butter and flour.
            <br />
            Hand-folded, slow-baked, honestly made.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mb-4">Visit</h3>
            <ul className="space-y-2 font-serif text-cream/85">
              <li>{site.region}</li>
              <li>{site.hours.split('·')[0]}</li>
              <li>{site.hours.split('·')[1]}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mb-4">Menu</h3>
            <ul className="space-y-2 font-serif text-cream/85">
              <li><Link href="#menu" className="hover:text-orange-soft transition-colors">Meat Pie</Link></li>
              <li><Link href="#menu" className="hover:text-orange-soft transition-colors">Chicken Pie</Link></li>
              <li><Link href="#menu" className="hover:text-orange-soft transition-colors">Fish Rolls</Link></li>
              <li ><Link href="#menu" className="hover:text-orange-soft transition-colors">Sausage Rolls</Link></li>
              <li><Link href="#menu" className="hover:text-orange-soft transition-colors">Puff Puff</Link></li>
              <li><Link href="#menu" className="hover:text-orange-soft transition-colors">Banana Bread</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mb-4">House</h3>
            <ul className="space-y-2 font-serif text-cream/85">
              <li><Link href="#story" className="hover:text-orange-soft transition-colors">Our Story</Link></li>
              <li><Link href="#gallery" className="hover:text-orange-soft transition-colors">Gallery</Link></li>
              <li><Link href="#press" className="hover:text-orange-soft transition-colors">Press</Link></li>
              <li><Link href="#enquire" className="hover:text-orange-soft transition-colors">Enquire</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mb-4">Reach Us</h3>
            <ul className="space-y-2 font-serif text-cream/85">
              <li><a href={buildWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-orange-soft transition-colors">WhatsApp</a></li>
              <li><a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-soft transition-colors">Instagram</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-orange-soft transition-colors">Email</a></li>
              <li><a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange-soft transition-colors">Leave a Review</a></li>

            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-cream/15">
          <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-cream/50">
            &copy; {new Date().getFullYear()} {site.name} &middot; All rights reserved
          </div>
          <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-cream/50 flex items-center gap-3">
            <span>Hand-folded daily in {site.city}</span>
            <span className="text-orange">&middot;</span>
            <span>Built by Klavoir</span>
          </div>
        </div>

       
      </div>
    </footer>
  );
}