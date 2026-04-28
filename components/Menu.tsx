'use client';

import { useState } from 'react';
import Image from 'next/image';
import { menu, type MenuItem, type BulkOption } from '@/lib/menu';
import { QuickOrderModal } from './QuickOrderModal';

export function Menu() {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [activeBulk, setActiveBulk] = useState<BulkOption | null>(null);

  const openOrder = (item: MenuItem, bulk?: BulkOption) => {
    setActiveItem(item);
    setActiveBulk(bulk ?? null);
  };

  const closeOrder = () => {
    setActiveItem(null);
    setActiveBulk(null);
  };

  return (
    <>
      <section id="menu" className="py-32 bg-cream">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <div className="inline-flex items-center gap-3 mb-6 font-sans text-[11px] uppercase tracking-[0.32em] text-orange">
                <span className="w-12 h-px bg-orange" />
                <span>№ 03 · The Menu</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-light leading-[1.05]">
                Folded with <em className="italic text-wine">intention.</em>
              </h2>
            </div>
            <div className="md:pt-16 max-w-md">
              <p className="font-serif text-lg text-ink-soft leading-relaxed">
                A short menu by design — we'd rather make six things beautifully than forty things adequately. Tap any item to open a quick order form.
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute mt-4">
                Lead time · 48 hours minimum · Bespoke orders welcomed
              </p>
            </div>
          </div>

          <div className="border-t border-ink/15">
            {menu.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-12 gap-4 md:gap-8 py-10 border-b border-ink/15 group hover:bg-cream-warm/40 transition-colors"
              >
                {/* Roman numeral */}
                <div className="col-span-1 font-display italic text-2xl text-orange">{item.romanNumeral}</div>

                {/* Image thumbnail */}
                <div className="col-span-2 md:col-span-2">
                  <button
                    type="button"
                    onClick={() => openOrder(item)}
                    className="block relative aspect-square w-full rounded-sm overflow-hidden bg-cream-warm cursor-pointer"
                    aria-label={`Order ${item.name}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 25vw, 15vw"
                    />
                  </button>
                </div>

                {/* Name + description */}
                <div className="col-span-9 md:col-span-5">
                  <h3 className="font-display text-3xl md:text-4xl mb-2 leading-tight">
                    {item.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <em className="italic text-wine">{item.name.split(' ').slice(-1)}</em>
                  </h3>
                  <p className="font-serif text-base text-ink-soft leading-relaxed mb-3 max-w-md">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-sans uppercase tracking-[0.18em] text-ink-mute">
                    {item.signature && <span className="text-orange">House Signature</span>}
                    {item.signature && <span>·</span>}
                    <span>Allergens: {item.allergens.join(', ')}</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-between md:items-end">
                  <div className="md:text-right">
                    <div className="font-display text-2xl md:text-3xl text-wine">
                      £{item.pricePer.toFixed(2)}
                    </div>
                    <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute mt-1">
                      {item.pricePerLabel}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 md:items-end">
                    {item.bulkOptions && item.bulkOptions.length > 0 && (
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {item.bulkOptions.map((bulk, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => openOrder(item, bulk)}
                            className="text-[11px] font-sans uppercase tracking-[0.15em] border border-ink/30 px-3 py-1.5 hover:border-wine hover:bg-wine hover:text-cream transition-all"
                          >
                            {bulk.label} · £{bulk.price}
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => openOrder(item)}
                      className="bg-wine text-cream px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.18em] hover:bg-wine-deep transition-colors flex items-center gap-2 self-start md:self-end mt-1"
                    >
                      Order <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center mt-12 font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            All items contain allergens — please notify us of any dietary requirements when ordering.
            <br />
            Food Hygiene Rating · 5 (Very Good) · Manchester City Council
          </p>
        </div>
      </section>

      {/* Modal — rendered when an item is selected */}
      <QuickOrderModal
        item={activeItem}
        preselectedBulk={activeBulk}
        onClose={closeOrder}
      />
    </>
  );
}
