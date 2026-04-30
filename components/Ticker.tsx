export function Ticker() {
  const items = [
    'Hand-folded daily',
    'Small bites · big delight',
    'Delivered across the United Kingdom',
    '48-hour lead time',
    'Bespoke boxes for events',
  ];

  // Duplicate for seamless loop
  const looped = [...items, ...items];

  return (
    <div className="bg-wine text-cream font-sans text-[11px] uppercase tracking-[0.28em] py-2.5 overflow-hidden relative z-[5] border-b border-cream/15">
      <div className="inline-flex whitespace-nowrap animate-ticker pl-[100%]">
        {looped.map((item, i) => (
          <span key={i} className="px-7 inline-flex items-center gap-3.5">
            <span>{item}</span>
            <i className="not-italic text-orange-soft">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
