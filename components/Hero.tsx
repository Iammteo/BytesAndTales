import Image from 'next/image';
import Link from 'next/link';
import { buildWhatsAppGeneralUrl } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative min-h-screen pt-40 pb-20 bg-wine text-cream overflow-hidden">
      {/* Subtle radial highlight in background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gradient-radial from-orange/20 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* SVG defs for blob clip-path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
            {/* Asymmetric organic blob — soft, slightly off-balance, hand-cut feel */}
            <path d="M 0.46 0.02
                     C 0.65 0.0, 0.85 0.05, 0.94 0.22
                     C 1.02 0.40, 0.99 0.62, 0.93 0.78
                     C 0.86 0.94, 0.66 1.0, 0.48 0.99
                     C 0.28 0.98, 0.10 0.92, 0.04 0.74
                     C -0.02 0.55, 0.01 0.32, 0.10 0.18
                     C 0.20 0.05, 0.30 0.03, 0.46 0.02 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="wrap relative grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="animate-fadeUp">
          <div className="flex items-center gap-3 mb-8 font-sans text-[11px] uppercase tracking-[0.32em] text-cream/80">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="w-12 h-px bg-cream/40" />
            <span>Hand-folded · Slow-baked · Manchester</span>
          </div>

          <h1 className="font-display text-[72px] md:text-[96px] leading-[0.95] tracking-tight font-light mb-8">
            Pastries
            <br />
            that taste
            <br />
            like <em className="italic text-orange-soft font-normal">home</em>
            <span className="text-orange">.</span>
          </h1>

          <div className="w-full max-w-md mt-8 pt-6 border-t border-cream/20">
            <p className="font-serif text-lg leading-relaxed text-cream/85">
              Bytes &amp; Tales is a Manchester pastry house, where every meat pie, sausage roll and home-style loaf is folded by hand and finished with the kind of{' '}
              <em className="text-orange-soft not-italic font-medium">care</em> your grandmother would nod at.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="#menu"
              className="bg-cream text-wine px-7 py-4 font-sans text-[13px] uppercase tracking-[0.18em] hover:bg-orange hover:text-cream transition-all flex items-center gap-2"
            >
              Discover the house <span aria-hidden>→</span>
            </Link>
            <a
              href={buildWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream/40 text-cream px-7 py-4 font-sans text-[13px] uppercase tracking-[0.18em] hover:bg-cream hover:text-wine transition-all flex items-center gap-2"
            >
              Order on WhatsApp <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Right: blob-shaped product photo */}
        <div className="relative aspect-square animate-fadeUp" style={{ animationDelay: '0.4s' }}>
          {/* Soft orange shadow shape behind, slightly offset */}
          <div
            className="absolute inset-0 bg-orange/30 blur-2xl"
            style={{ clipPath: 'url(#hero-blob)', transform: 'translate(20px, 20px) rotate(-3deg)' }}
          />

          {/* Main photo with blob clip */}
          <div
            className="absolute inset-0"
            style={{ clipPath: 'url(#hero-blob)' }}
          >
            <Image
              src="/images/menu/meat-pie-box.jpg"
              alt="A box of golden Bytes & Tales meat pies, fresh from the oven"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Floating caption tag - "Your order made my day" */}
          <div className="absolute bottom-4 left-4 md:bottom-12 md:-left-6 bg-cream text-wine px-5 py-3 shadow-2xl rotate-[-3deg] z-10">
            <div className="font-display italic text-base leading-tight">Your order</div>
            <div className="font-display italic text-base leading-tight">made my day.</div>
            <div className="font-sans text-[9px] uppercase tracking-[0.2em] mt-1.5 text-ink-mute">
              From a recent customer
            </div>
          </div>

          {/* Decorative dots scattered */}
          <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-orange-soft animate-pulse" />
          <div className="absolute top-1/3 -right-2 w-3 h-3 rounded-full bg-cream/60" />
          <div className="absolute bottom-1/4 left-2 w-1.5 h-1.5 rounded-full bg-orange" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 font-sans text-[10px] uppercase tracking-[0.32em] text-cream/60 flex items-center gap-2">
        Scroll <span className="w-8 h-px bg-cream/40" />
      </div>
    </section>
  );
}
