'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-[38px] left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-ink/10 py-3' : 'py-5'
      }`}
    >
      <div className="wrap flex items-center justify-between">
        <Link href="/" aria-label="Bytes & Tales home">
          <Logo onWine={!scrolled} />
        </Link>

        <ul
          className={`hidden md:flex items-center gap-8 font-sans text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 ${
            scrolled ? 'text-ink' : 'text-cream'
          }`}
        >
          <li>
            <Link href="#story" className="hover:text-orange-soft transition-colors">
              Story
            </Link>
          </li>
          <li>
            <Link href="#menu" className="hover:text-orange-soft transition-colors">
              Menu
            </Link>
          </li>
          <li>
            <Link href="#gallery" className="hover:text-orange-soft transition-colors">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="#press" className="hover:text-orange-soft transition-colors">
              Press
            </Link>
          </li>
          <li>
            <Link href="#enquire" className="hover:text-orange-soft transition-colors">
              Enquire
            </Link>
          </li>
        </ul>

        <Link
          href="#menu"
          className={`px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 ${
            scrolled
              ? 'bg-wine text-cream hover:bg-wine-deep'
              : 'bg-cream text-ink hover:bg-orange hover:text-cream'
          }`}
        >
          Order Now <span aria-hidden>→</span>
        </Link>
      </div>
    </nav>
  );
}