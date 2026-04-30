'use client';

import { useEffect, useState } from 'react';
import { useCart } from './CartProvider';

export function CartFloat() {
  const { itemCount, subtotal, openCart, justAddedLineId } = useCart();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (justAddedLineId) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 700);
      return () => clearTimeout(t);
    }
  }, [justAddedLineId]);

  if (itemCount === 0) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${itemCount} items, £${subtotal.toFixed(2)}`}
      className={`fixed bottom-6 right-6 z-40 bg-wine hover:bg-wine-deep text-cream px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 font-sans text-sm font-medium transition-all hover:-translate-y-0.5 ${
        pulse ? 'cart-pulse' : ''
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 3h2l2.4 12.5a2 2 0 0 0 2 1.5h9.6a2 2 0 0 0 2-1.6L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
      <span className="font-display text-base leading-none">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </span>
      <span className="text-cream/40">·</span>
      <span className="font-display text-base leading-none">£{subtotal.toFixed(2)}</span>
      <span aria-hidden className="ml-1">→</span>

      <style jsx>{`
        @keyframes cartPulse {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.12); }
          60% { transform: scale(0.97); }
        }
        .cart-pulse { animation: cartPulse 0.7s ease-out; }
      `}</style>
    </button>
  );
}