'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from './CartProvider';
import { buildWhatsAppCartUrl } from '@/lib/cart';
import { site, formatDate } from '@/lib/site';

export function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, updateQuantity, removeLine, clear } = useCart();
  const [postcode, setPostcode] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC closes
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    if (isOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, closeCart]);

  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  const grandTotal = subtotal + site.deliveryFee;

  const handleCheckout = () => {
  const newErrors: { [k: string]: string } = {};
  if (lines.length === 0) newErrors.cart = 'Your cart is empty';
  if (!postcode.trim()) newErrors.postcode = 'Postcode is required';
  if (!date) {
    newErrors.date = 'Please choose a delivery date';
  } else if (date < minDate) {
    newErrors.date = 'Date must be at least 48 hours from now';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }


    const url = buildWhatsAppCartUrl({
      lines,
      subtotal,
      postcode: postcode.trim().toUpperCase(),
      date: formatDate(date),
      notes: notes.trim() || undefined,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => closeCart(), 400);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[100] animate-fadeIn"
        onClick={closeCart}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-labelledby="cart-drawer-title"
        aria-modal="true"
        className="fixed top-0 right-0 bottom-0 w-full md:max-w-md lg:max-w-lg bg-cream z-[101] shadow-2xl flex flex-col animate-slideInRight"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-ink/10 bg-cream-warm/40">
          <div>
            <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange mb-1">Your order</div>
            <h2 id="cart-drawer-title" className="font-display text-2xl text-ink leading-tight">
              {lines.length === 0 ? 'Empty' : `${lines.length} ${lines.length === 1 ? 'item' : 'items'}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 flex items-center justify-center text-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-5 space-y-4">
          {lines.length === 0 ? (
            <p className="font-serif italic text-ink-mute text-center py-12">
              Nothing in your order yet. Add something from the menu.
            </p>
          ) : (
            lines.map((line) => {
              const isAtomic = !!(line.bulkLabel || line.variantBreakdown);
              return (
                <div
                  key={line.id}
                  className="flex gap-4 pb-4 border-b border-ink/10 last:border-b-0"
                >
                  {line.imageUrl && (
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-cream-warm">
                      <Image src={line.imageUrl} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg text-ink leading-tight">
                      {line.productName}
                    </div>
                    {line.bulkLabel && (
                      <div className="font-serif italic text-sm text-ink-soft mt-0.5">
                        {line.bulkLabel}
                      </div>
                    )}
                    {line.variantBreakdown && (
                      <div className="font-serif italic text-sm text-ink-soft mt-0.5">
                        {line.variantBreakdown}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      {isAtomic ? (
                        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                          Qty: {line.quantity}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            aria-label="Decrease"
                            disabled={line.quantity <= 1}
                            className="w-7 h-7 border border-ink/20 rounded-sm font-sans text-sm text-ink hover:bg-cream-warm hover:border-wine transition-all disabled:opacity-30"
                          >
                            −
                          </button>
                          <span className="font-display text-base w-7 text-center">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            aria-label="Increase"
                            className="w-7 h-7 border border-ink/20 rounded-sm font-sans text-sm text-ink hover:bg-cream-warm hover:border-wine transition-all"
                          >
                            +
                          </button>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-wine transition-colors ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-display text-lg text-wine flex-shrink-0">
                    £{line.lineTotal.toFixed(2)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Checkout area */}
        {lines.length > 0 && (
          <div className="border-t border-ink/15 bg-cream-warm/30 px-6 md:px-8 py-5 space-y-4">
            <div className="space-y-3">
              <Field label="Delivery postcode *" error={errors.postcode}>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. M20 4PE"
                  className="w-full bg-cream border border-ink/20 rounded-sm px-3 py-2.5 font-serif text-base text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 uppercase"
                />
              </Field>
              <Field label="Preferred delivery date *" error={errors.date}>
  <input
    type="date"
    value={date}
    min={minDate}
    onChange={(e) => {
      const picked = e.target.value;
      setDate(picked);
      // Re-validate against minDate (some mobile browsers ignore the min attribute)
      if (picked && picked < minDate) {
        setErrors((prev) => ({
          ...prev,
          date: 'Please pick a date at least 48 hours from now',
        }));
      } else {
        setErrors((prev) => {
          const { date: _omit, ...rest } = prev;
          return rest;
        });
      }
    }}
    className="w-full bg-cream border border-ink/20 rounded-sm px-3 py-2.5 font-serif text-base text-ink focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30"
  />
  <span className="block mt-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute">
    Minimum 48 hours notice
  </span>
</Field>
              <Field label="Notes (optional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Allergies, occasion, dietary notes…"
                  rows={2}
                  className="w-full bg-cream border border-ink/20 rounded-sm px-3 py-2.5 font-serif text-sm text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 resize-none"
                />
              </Field>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-ink/10">
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-mute">Subtotal</span>
                <span className="font-serif text-base text-ink">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-mute">Delivery</span>
                <span className="font-serif text-base text-ink">£{site.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-ink/10 mt-2">
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-mute">Grand total</span>
                <span className="font-display text-2xl text-wine">£{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-5 font-sans text-[13px] uppercase tracking-[0.18em] flex items-center justify-center gap-3 transition-colors rounded-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Send order to WhatsApp
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('Clear your whole order?')) clear();
              }}
              className="w-full font-sans text-[10px] uppercase tracking-[0.22em] text-ink-mute hover:text-wine transition-colors py-1"
            >
              Clear order
            </button>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
          .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
        `}</style>
      </aside>
    </>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-1.5">
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-1 font-sans text-[11px] text-wine">{error}</span>
      )}
    </label>
  );
}