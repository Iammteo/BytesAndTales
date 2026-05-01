'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { MenuItem, BulkOption, Variant } from '@/lib/menu';
import { useCart } from './CartProvider';
import type { CartLine } from '@/lib/cart';

type QuickOrderModalProps = {
  item: MenuItem | null;
  preselectedBulk?: BulkOption | null;
  preselectedVariant?: Variant | null;
  onClose: () => void;
};

const hasPricedVariants = (item: MenuItem): boolean =>
  !!(item.variants && item.variants.length > 0 && item.variants.some((v) => v.price !== undefined));

export function QuickOrderModal({
  item,
  preselectedBulk,
  preselectedVariant,
  onClose,
}: QuickOrderModalProps) {
  const { addLine } = useCart();

  const [quantity, setQuantity] = useState<number>(item?.minOrder ?? 1);
  const [variantQtys, setVariantQtys] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [justAdded, setJustAdded] = useState(false);

  // Reset form when item changes
 useEffect(() => {
  const initialQty = preselectedBulk?.qty ?? item?.minOrder ?? item?.quantityStep ?? 1;
  setQuantity(initialQty);
  const initial: Record<string, number> = {};
  item?.variants?.forEach((v) => {
    initial[v.id] = preselectedVariant?.id === v.id ? 1 : 0;
  });
  setVariantQtys(initial);
  setErrors({});
  setJustAdded(false);
}, [item, preselectedBulk, preselectedVariant]);

  // Lock body scroll
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

  // ESC closes
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (item) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [item, onClose]);

  if (!item) return null;

  const isBulk = !!preselectedBulk;
  const priced = hasPricedVariants(item);
  const hasVariants = !!(item.variants && item.variants.length > 0);

  const variantTotalQty = Object.values(variantQtys).reduce((s, n) => s + n, 0);

  const total = isBulk
    ? preselectedBulk!.price
    : priced
    ? (item.variants ?? []).reduce((sum, v) => {
        const q = variantQtys[v.id] ?? 0;
        return sum + q * (v.price ?? item.pricePer);
      }, 0)
    : hasVariants
    ? variantTotalQty * item.pricePer
    : quantity * item.pricePer;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [k: string]: string } = {};

    if (priced || hasVariants) {
      if (variantTotalQty < 1) {
        newErrors.variant = 'Please choose at least one option';
      }
    } else if (!isBulk) {
      if (quantity < 1) newErrors.quantity = 'Please enter a quantity of 1 or more';
      if (item.minOrder && quantity < item.minOrder) {
        newErrors.quantity = `Minimum order is ${item.minOrder}`;
      }
      if (item.quantityStep && quantity % item.quantityStep !== 0) {
        newErrors.quantity = `Quantity must be a multiple of ${item.quantityStep}`;
}
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build line for cart
    let lineData: Omit<CartLine, 'id'>;

    if (priced) {
      // Puff Puff style — multiple priced variants combine into one line
      const breakdown = (item.variants ?? [])
        .filter((v) => (variantQtys[v.id] ?? 0) > 0)
        .map((v) => `${variantQtys[v.id]} ${v.label}`)
        .join(', ');

      lineData = {
        productId: item.id,
        productName: item.name,
        quantity: variantTotalQty,
        unitPrice: total / variantTotalQty,
        unitLabel: item.pricePerLabel,
        lineTotal: total,
        variantBreakdown: breakdown,
        imageUrl: item.image,
      };
    } else if (hasVariants) {
      // Plain (unpriced) variants — like the old Bread case (currently unused but kept for safety)
      const breakdown = (item.variants ?? [])
        .filter((v) => (variantQtys[v.id] ?? 0) > 0)
        .map((v) => `${variantQtys[v.id]} ${v.label}`)
        .join(', ');

      lineData = {
        productId: item.id,
        productName: item.name,
        quantity: variantTotalQty,
        unitPrice: item.pricePer,
        unitLabel: item.pricePerLabel,
        lineTotal: total,
        variantBreakdown: breakdown,
        imageUrl: item.image,
      };
    } else if (isBulk) {
      lineData = {
        productId: item.id,
        productName: item.name,
        quantity: preselectedBulk!.qty,
        unitPrice: preselectedBulk!.price / preselectedBulk!.qty,
        unitLabel: item.pricePerLabel,
        lineTotal: preselectedBulk!.price,
        bulkLabel: preselectedBulk!.label,
        imageUrl: item.image,
      };
    } else {
      lineData = {
        productId: item.id,
        productName: item.name,
        quantity,
        unitPrice: item.pricePer,
        unitLabel: item.pricePerLabel,
        lineTotal: total,
        imageUrl: item.image,
      };
    }

    addLine(lineData);
    setJustAdded(true);
    setTimeout(() => onClose(), 700);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[100] animate-fadeIn"
        onClick={onClose}
        aria-hidden
      />

      <div className="fixed inset-0 z-[101] flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-none">
        <div
          role="dialog"
          aria-labelledby="quick-order-title"
          aria-modal="true"
          className="bg-cream w-full md:max-w-xl max-h-[92vh] overflow-y-auto pointer-events-auto shadow-2xl rounded-t-2xl md:rounded-sm animate-slideUp"
        >
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
                <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="100px" />
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
                ) : priced ? (
                  <div className="font-serif italic text-sm text-ink-soft mt-1">
                    Choose tray sizes below
                  </div>
                ) : (
                  <div className="font-serif italic text-sm text-ink-soft mt-1">
                    £{item.pricePer.toFixed(2)} {item.pricePerLabel}
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleAdd} className="p-6 md:p-8 space-y-5">
            {/* Variant grid (priced or unpriced) */}
            {(priced || hasVariants) && (
              <Field
                label={item.variantLabel ?? 'Choose options *'}
                error={errors.variant}
              >
                <div className="space-y-2">
                  {item.variants?.map((v) => {
                    const qty = variantQtys[v.id] ?? 0;
                    const setQty = (n: number) =>
                      setVariantQtys((prev) => ({
                        ...prev,
                        [v.id]: Math.max(0, Math.min(99, n)),
                      }));
                    const vPrice = v.price ?? item.pricePer;
                    return (
                      <div
                        key={v.id}
                        className="flex items-center justify-between gap-3 bg-cream-warm/40 border border-ink/15 rounded-sm px-4 py-2.5"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-base text-ink leading-tight">{v.label}</div>
                          <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute mt-0.5">
                            £{vPrice.toFixed(2)} {v.unitLabel ?? item.pricePerLabel}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setQty(qty - 1)}
                            aria-label={`Decrease ${v.label}`}
                            disabled={qty === 0}
                            className="w-9 h-9 border border-ink/20 rounded-sm font-sans text-base text-ink hover:bg-cream hover:border-wine transition-all disabled:opacity-30"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-display text-lg text-ink">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(qty + 1)}
                            aria-label={`Increase ${v.label}`}
                            className="w-9 h-9 border border-ink/20 rounded-sm font-sans text-base text-ink hover:bg-cream hover:border-wine transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Field>
            )}

            {/* Plain quantity */}
          {!isBulk && !priced && !hasVariants && (
  <Field label="Quantity *" error={errors.quantity}>
    <div className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        onClick={() => {
          const step = item.quantityStep ?? 1;
          const min = item.minOrder ?? 1;
           setQuantity((prev) => Math.max(min, prev - step));
        }}
        aria-label="Decrease quantity"
        disabled={quantity <= (item.minOrder ?? 1)}
        className="w-10 h-10 border border-ink/20 rounded-sm font-sans text-lg text-ink hover:bg-cream-warm hover:border-wine transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="w-20 text-center bg-cream-warm/40 border border-ink/20 rounded-sm py-2.5 font-display text-lg text-ink">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => {
          const step = item.quantityStep ?? 1;
          setQuantity((prev) => Math.min(200, prev + step));
        }}
        aria-label="Increase quantity"
        className="w-10 h-10 border border-ink/20 rounded-sm font-sans text-lg text-ink hover:bg-cream-warm hover:border-wine transition-all"
      >
        +
      </button>
      <span className="font-sans text-xs uppercase tracking-[0.18em] text-ink-mute ml-2">
        {item.quantityStep && item.quantityStep > 1
          ? `Sold in ${item.quantityStep}s · Min. ${item.minOrder ?? item.quantityStep}`
          : item.minOrder
          ? `Min. ${item.minOrder}`
          : ''}
      </span>
    </div>
  </Field>
)}

            <div className="bg-orange/10 border border-orange/30 rounded-sm px-4 py-3">
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-orange mb-1">Allergens</div>
              <div className="font-serif text-sm text-ink-soft">
                Contains: {item.allergens.join(', ')}.
              </div>
            </div>

            <div className="pt-4 border-t border-ink/15">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-mute">Subtotal</span>
                <span className="font-display text-3xl text-wine">£{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={justAdded}
                className={`w-full py-4 px-6 font-sans text-[13px] uppercase tracking-[0.18em] flex items-center justify-center gap-3 transition-all rounded-sm ${
                  justAdded
                    ? 'bg-orange text-cream'
                    : 'bg-wine hover:bg-wine-deep text-cream'
                }`}
              >
                {justAdded ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Added to order
                  </>
                ) : (
                  <>
                    Add to order <span aria-hidden>→</span>
                  </>
                )}
              </button>

              <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute text-center">
                Items added to your order · Send to WhatsApp from cart
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="block font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 font-sans text-[11px] text-wine">{error}</span>
      )}
    </label>
  );
}