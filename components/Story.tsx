import Image from 'next/image';

export function Story() {
  return (
    <section id="story" className="py-32 bg-cream-warm relative overflow-hidden">
      <div className="wrap relative grid md:grid-cols-2 gap-16 items-center">
        {/* Left: image */}
        <div className="relative aspect-[4/5] order-2 md:order-1">
          <div className="absolute inset-0 rounded-sm overflow-hidden shadow-xl">
            <Image
              src="/images/menu/meat-pie.jpg"
              alt="Hand-crimped meat pies — fig. ii, the daily fold"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-ink/80 backdrop-blur-sm text-cream px-4 py-2">
            <span className="font-serif italic text-sm">fig. ii — the daily fold</span>
          </div>
        </div>

        {/* Right: copy */}
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-3 mb-6 font-sans text-[11px] uppercase tracking-[0.32em] text-orange">
            <span className="w-12 h-px bg-orange" />
            <span>№ 02 · The Story</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.1] mb-10">
            A pastry house that <em className="italic text-wine">remembers</em> recipes.
          </h2>

          <blockquote className="border-l-2 border-orange pl-6 mb-8">
            <p className="font-display italic text-xl md:text-2xl text-ink-soft leading-relaxed">
              "Every pie is a paragraph. Every bite, a line you'll want to read twice."
            </p>
          </blockquote>

          <p className="font-serif text-lg leading-relaxed text-ink-soft mb-6">
            Our recipes lean on what's familiar — peppered minced beef, nutmeg-scented dough, hand-crimped edges, and toasted-coconut tops on loaves your aunt would recognise. We bake in small batches across Greater Manchester, never compromise on butter, and only deliver what we'd happily eat ourselves.
          </p>

          {/* Three stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-ink/15">
            <div>
              <div className="font-display text-4xl md:text-5xl text-wine">100<span className="text-2xl">%</span></div>
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute mt-2">Hand-folded</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-wine">06</div>
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute mt-2">House classics</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-wine">∞</div>
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute mt-2">Stories per bite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
