import Image from 'next/image';

export function Gallery() {
  const plates = [
    {
      src: '/images/menu/meat-pie.jpg',
      caption: 'Meat pie, golden hour',
      plate: 'Plate I',
      tall: true,
    },
    {
      src: '/images/menu/sausage-roll.jpg',
      caption: 'Sausage rolls, by the dozen',
      plate: 'Plate II',
      tall: false,
    },
    {
      src: '/images/menu/loaves.jpg',
      caption: 'Loaves on a wooden tray',
      plate: 'Plate III',
      tall: false,
    },
    {
      src: '/images/menu/mixed-box.jpg',
      caption: 'A mixed box, ready to travel',
      plate: 'Plate IV',
      tall: true,
    },
    {
      src: '/images/menu/meat-pie-box.jpg',
      caption: 'A delivery, with a note',
      plate: 'Plate V',
      tall: false,
    },
  ];

  return (
    <section id="gallery" className="py-32 bg-cream">
      <div className="wrap">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center gap-3 mb-6 font-sans text-[11px] uppercase tracking-[0.32em] text-orange">
              <span className="w-12 h-px bg-orange" />
              <span>№ 04 · The Gallery</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-[1.05]">
              A celebration of <em className="italic text-wine">taste</em>, shape <em className="italic text-orange">&amp;</em> <em className="italic text-wine">crumb.</em>
            </h2>
          </div>
          <div className="md:pt-12 max-w-md">
            <p className="font-serif text-lg text-ink-soft leading-relaxed">
              Every plate a story of craftsmanship — from the crimped edge of a pie to the dusting of toasted coconut on a loaf.
            </p>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {plates.map((plate, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden bg-ink/5 ${
                plate.tall ? 'aspect-[3/4] md:row-span-2' : 'aspect-square'
              } group cursor-pointer`}
            >
              <Image
                src={plate.src}
                alt={plate.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent text-cream">
                <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange-soft mb-1">
                  {plate.plate}
                </div>
                <div className="font-serif italic text-base">{plate.caption}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
