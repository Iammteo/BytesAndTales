'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    if (menuOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '#story', label: 'Story' },
    { href: '#menu', label: 'Menu' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#press', label: 'Press' },
    { href: '#enquire', label: 'Enquire' },
  ];

  return (
    <>
      <nav
        className={`fixed top-[38px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-ink/10 py-3' : 'py-5'
        }`}
      >
        <div className="wrap flex items-center justify-between">
          <Link href="/" aria-label="Bytes & Tales home" onClick={closeMenu}>
            <Logo onWine={!scrolled} />
          </Link>

          {/* Desktop links */}
          <ul
            className={`hidden md:flex items-center gap-8 font-sans text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              scrolled ? 'text-ink' : 'text-cream'
            }`}
          >
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-orange-soft transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Order Now button */}
          <Link
            href="#menu"
            className={`hidden md:flex px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.2em] items-center gap-2 transition-all duration-300 ${
              scrolled
                ? 'bg-wine text-cream hover:bg-wine-deep'
                : 'bg-cream text-ink hover:bg-orange hover:text-cream'
            }`}
          >
            Order Now <span aria-hidden>→</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={`md:hidden w-11 h-11 flex items-center justify-center rounded-full transition-all ${
              scrolled
                ? 'bg-wine text-cream hover:bg-wine-deep'
                : 'bg-cream text-ink hover:bg-orange hover:text-cream'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[200] bg-wine text-cream flex flex-col mobile-menu-anim md:hidden"
        >
          {/* Header bar — close button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-cream/15">
            <Logo onWine={true} />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
              </svg>
            </button>
          </div>

         
         {/* Links */}
{/* Links */}
<nav className="flex-1 flex flex-col items-start justify-start pt-8 px-8 gap-1">
  {navLinks.map((l, i) => (
    <Link
      key={l.href}
      href={l.href}
      onClick={closeMenu}
      className="font-display text-3xl py-2.5 hover:text-orange-soft transition-colors flex items-center gap-3 group"
      style={{
        animation: `mobileLinkIn 0.4s ease-out ${0.05 + i * 0.05}s backwards`,
      }}
    >
      <span className="font-sans text-[10px] italic text-orange-soft opacity-60">
        {String(i + 1).padStart(2, '0')}.
      </span>
      {l.label}
      <span aria-hidden className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">→</span>
    </Link>
  ))}

  {/* Quick info filling the space */}
  <div className="mt-10 pt-8 border-t border-cream/15 w-full space-y-1">
    <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mb-1">
      Open
    </div>
    <div className="font-serif text-base text-cream/85">
      Mon – Sat · 9am – 5pm
    </div>
    <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mt-5 mb-1">
      Delivery
    </div>
    <div className="font-serif text-base text-cream/85">
       United Kingdom · 48 hours notice
    </div>
    <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mt-5 mb-1">
      Get in touch
    </div>
    <div className="font-serif text-base text-cream/85">
      WhatsApp · Instagram · Email
    </div>
  </div>
</nav>

          {/* Bottom CTAs */}
          <div className="px-6 py-6 border-t border-cream/15 space-y-3">
            <Link
              href="#menu"
              onClick={closeMenu}
              className="w-full bg-cream text-wine py-4 px-5 font-sans text-[13px] uppercase tracking-[0.18em] flex items-center justify-center gap-3 hover:bg-orange hover:text-cream transition-colors"
            >
              Order Now <span aria-hidden>→</span>
            </Link>
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-cream/60 text-center pt-2">
              Hand-folded daily · Manchester
            </p>
          </div>

          <style jsx>{`
         @keyframes mobileMenuIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes mobileLinkIn {
              from { opacity: 0; transform: translateX(-12px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .mobile-menu-anim { animation: mobileMenuIn 0.5s ease-out; }
          `}</style>
        </div>
      )}
    </>
  );
}
