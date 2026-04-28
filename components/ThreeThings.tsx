export function ThreeThings() {
  const things = [
    {
      title: 'Daily Pastries',
      titleAccent: 'Pastries',
      description:
        'Hand-folded meat pies, sausage rolls and cocktail rolls — baked in small batches and ready by the hour.',
    },
    {
      title: 'Bespoke Boxes',
      titleAccent: 'Boxes',
      description:
        'Curated pastry boxes for gifts, office mornings and celebrations — chosen the way a sommelier picks wine.',
    },
    {
      title: 'Custom Orders',
      titleAccent: 'Orders',
      description:
        'Bulk orders for events, weddings and meetings — placed in advance, hand-finished, and delivered across Greater Manchester.',
    },
  ];

  return (
    <section className="py-32 bg-cream">
      <div className="wrap">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 font-sans text-[11px] uppercase tracking-[0.32em] text-ink-mute">
            <span className="w-12 h-px bg-orange" />
            <span>№ 01 · The House</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-tight">
            Three things, <em className="italic text-wine">done well.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/15">
          {things.map((thing, i) => (
            <div key={i} className="px-8 py-12 md:py-8 text-center">
              <h3 className="font-display text-3xl mb-5">
                {thing.title.replace(thing.titleAccent, '')}
                <em className="italic text-wine">{thing.titleAccent}</em>
              </h3>
              <p className="font-serif text-lg text-ink-soft leading-relaxed max-w-xs mx-auto">
                {thing.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
