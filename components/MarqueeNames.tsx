export function MarqueeNames() {
  const names = ['Meat Pie', 'Sausage Roll', 'Cocktail Sausage Roll', 'Coconut Loaf', 'Banana Loaf', 'Oreo Loaf'];

  // Duplicate for seamless loop
  const looped = [...names, ...names];

  return (
    <div className="bg-ink py-12 overflow-hidden border-y border-ink/30">
      <div className="inline-flex whitespace-nowrap animate-ticker pl-[100%]">
        {looped.map((name, i) => (
          <span key={i} className="px-12 inline-flex items-center gap-12">
            <span className="font-display italic text-cream text-5xl md:text-6xl">{name}</span>
            <span className="text-orange text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
