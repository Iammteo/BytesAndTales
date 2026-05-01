import { site } from '@/lib/site';

export function Press() {
  const quotes = [
    {
      text: 'Honestly the best meat pies I have had in Manchester. Buttery pastry, generous filling, and they actually arrive warm.',
      author: 'Aisha O.',
      meta: 'Didsbury · Regular customer',
      stars: 5,
    },
    {
      text: 'Ordered for my husband birthday — the box was beautiful, the cocktail rolls disappeared in ten minutes. Already planning the next order.',
      author: 'Tunde A.',
      meta: 'Cheadle · Birthday delivery',
      stars: 5,
    },
    {
      text: 'Tastes exactly like the meat pies I grew up with. The hand-folded edges, the seasoning — everything is right.',
      author: 'Chioma E.',
      meta: 'Salford · Family order',
      stars: 5,
    },
  ];

  return (
    <section id="press" className="py-32 bg-cream-warm">
      <div className="wrap">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 font-sans text-[11px] uppercase tracking-[0.32em] text-orange">
            <span className="w-12 h-px bg-orange" />
            <span>No. 05 · In Praise Of</span>
            <span className="w-12 h-px bg-orange" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light leading-tight max-w-3xl mx-auto">
            Words from <em className="italic text-wine">our table</em> to yours.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {quotes.map((quote, i) => (
            <article key={i} className="relative bg-cream rounded-sm p-8 md:p-10 shadow-sm border border-ink/8 hover:border-orange/30 transition-all flex flex-col">
              <div className="font-display text-7xl leading-none text-orange/30 absolute top-4 left-6 select-none" aria-hidden>"</div>
              <div className="relative flex gap-1 mb-6 mt-2">
                {Array.from({ length: quote.stars }).map((_, idx) => (
                  <svg key={idx} width="14" height="14" viewBox="0 0 14 14" fill="#D9531E" aria-hidden><path d="M7 0.5l1.7 4.5h4.8l-3.9 2.9 1.5 4.6L7 9.5l-4.1 3 1.5-4.6L0.5 5h4.8L7 0.5z" /></svg>
                ))}
              </div>
              <blockquote className="relative flex-1">
                <p className="font-serif text-lg leading-relaxed text-ink-soft italic mb-8">{quote.text}</p>
              </blockquote>
              <footer className="relative pt-6 border-t border-ink/10">
                <div className="font-display text-base text-ink not-italic">{quote.author}</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute mt-1">{quote.meta}</div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-display italic text-2xl md:text-3xl text-ink-soft mb-6">Loved your order?</p>
          <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-wine text-cream px-7 py-4 font-sans text-[13px] uppercase tracking-[0.18em] hover:bg-wine-deep transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5l3.09 7.26L23 8.27l-5.73 5.59L18.91 22 12 18.27 5.09 22l1.64-8.14L1 8.27l7.91-1.01L12 .5z" /></svg>
            Leave a Google Review <span aria-hidden>{'\u2192'}</span>
          </a>
          <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute">Or tag <span className="text-orange">@bytesandtales</span> on Instagram to share yours</p>
        </div>
      </div>
    </section>
  );
}
