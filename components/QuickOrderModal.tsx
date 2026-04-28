'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { MenuItem, BulkOption } from '@/lib/menu';
import { buildWhatsAppFullOrderUrl, formatDate } from '@/lib/site';

type QuickOrderModalProps = {
  item: MenuItem | null; // null when closed
  preselectedBulk?: BulkOption | null; // optional bulk option preselected
  onClose: () => void;
};

export function QuickOrderModal({ item, preselectedBulk, onClose }: QuickOrderModalProps) {
  // ---- Form state ----
  const [quantity, setQuantity] = useState<number>(preselectedBulk?.qty ?? 1);
  const [postcode, setPostcode] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // Reset form when item changes
  useEffect(() => {
    setQuantity(preselectedBulk?.qty ?? 1);
    setPostcode('');
    setDate('');
    setNotes('');
    setErrors({});
  }, [item, preselectedBulk]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  // ESC key closes modal
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [item, onClose]);

  if (!item) return null;

  // ---- Pricing logic ----
  const isBulk = !!preselectedBulk;
  const total = isBulk ? preselectedBulk!.price : quantity * item.pricePer;

  // ---- Min date is tomorrow (48h lead time roughly) ----
  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  // ---- Validation + submit ----
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [k: string]: string } = {};
    if (quantity < 1) newErrors.quantity = 'Please enter a quantity of 1 or more';
    if (!postcode.trim()) newErrors.postcode = 'Postcode is required';
    if (!date) newErrors.date = 'Please choose a delivery date';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const url = buildWhatsAppFullOrderUrl({
      itemName: item.name,
      quantity,
      unitPrice: item.pricePer,
      unitLabel: item.pricePerLabel,
      total,
      postcode: postcode.trim().toUpperCase(),
      date: formatDate(date),
      notes: notes.trim() || undefined,
      bulkLabel: preselectedBulk?.label,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    // Close after a brief delay so user sees the action
    setTimeout(() => onClose(), 400);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[100] animate-fadeIn"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-[101] flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-none">
        <div
          role="dialog"
          aria-labelledby="quick-order-title"
          aria-modal="true"
          className="bg-cream w-full md:max-w-xl max-h-[92vh] overflow-y-auto pointer-events-auto shadow-2xl rounded-t-2xl md:rounded-sm animate-slideUp"
        >
          {/* Top: item summary */}
          <div className="relative bg-cream-warm/60 p-6 md:p-8 border-b border-ink/10">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 flex items-center justify-center text-ink transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-sm overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange mb-1">
                  Quick order
                </div>
                <h2 id="quick-order-title" className="font-display text-2xl md:text-3xl text-ink leading-tight">
                  {item.name}
                </h2>
                {isBulk ? (
                  <div className="font-serif italic text-sm text-ink-soft mt-1">
                    {preselectedBulk!.label} · £{preselectedBulk!.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="font-serif italic text-sm text-ink-soft mt-1">
                    £{item.pricePer.toFixed(2)} {item.pricePerLabel}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Quantity (hidden if bulk preset, since the bulk option fixes the qty) */}
            {!isBulk && (
              <Field label="Quantity *" error={errors.quantity}>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 border border-ink/20 rounded-sm font-sans text-lg text-ink hover:bg-cream-warm hover:border-wine transition-all"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 text-center bg-cream-warm/40 border border-ink/20 rounded-sm py-2.5 font-display text-lg text-ink focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(200, quantity + 1))}
                    aria-label="Increase quantity"
                    className="w-10 h-10 border border-ink/20 rounded-sm font-sans text-lg text-ink hover:bg-cream-warm hover:border-wine transition-all"
                  >
                    +
                  </button>
                  <span className="font-sans text-xs uppercase tracking-[0.18em] text-ink-mute ml-2">
                    {item.pricePerLabel.replace('per ', '')}{quantity > 1 ? 's' : ''}
                  </span>
                </div>
              </Field>
            )}

            {/* Postcode */}
            <Field label="Delivery postcode *" error={errors.postcode}>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. M20 4PE"
                autoCapitalize="characters"
                className="w-full bg-cream-warm/40 border border-ink/20 rounded-sm px-4 py-3 font-serif text-base text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 transition-all uppercase"
              />
              <span className="block mt-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                We deliver across Greater Manchester
              </span>
            </Field>

            {/* Date */}
            <Field label="Preferred delivery date *" error={errors.date}>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-cream-warm/40 border border-ink/20 rounded-sm px-4 py-3 font-serif text-base text-ink focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 transition-all"
              />
              <span className="block mt-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                Minimum 48 hours notice · Subject to availability
              </span>
            </Field>

            {/* Notes (optional) */}
            <Field label="Special requests (optional)">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Allergies, occasion, dietary notes…"
                rows={2}
                className="w-full bg-cream-warm/40 border border-ink/20 rounded-sm px-4 py-3 font-serif text-base text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine/30 transition-all resize-none"
              />
            </Field>

            {/* Allergen disclosure */}
            <div className="bg-orange/10 border border-orange/30 rounded-sm px-4 py-3">
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange mb-1">
                Allergens
              </div>
              <div className="font-serif text-sm text-ink-soft">
                Contains: {item.allergens.join(', ')}.{' '}
                <span className="italic">Please mention any allergies in special requests.</span>
              </div>
            </div>

            {/* Total + submit */}
            <div className="pt-5 border-t border-ink/15">
              <div className="flex items-baseline justify-between mb-5">
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                  Order total
                </span>
                <span className="font-display text-3xl text-wine">
                  £{total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 font-sans text-[13px] uppercase tracking-[0.18em] flex items-center justify-center gap-3 transition-colors rounded-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Send order to WhatsApp
              </button>

              <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute text-center">
                You'll be redirected to WhatsApp · We confirm before payment
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// ---- Field wrapper ----
function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="block font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 font-sans text-[11px] text-wine">
          {error}
        </span>
      )}
    </label>
  );
}
