'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { CartLine } from '@/lib/cart';

const STORAGE_KEY = 'bytesAndTales.cart.v1';

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  justAddedLineId: string | null;
  addLine: (line: Omit<CartLine, 'id'>) => string;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [justAddedLineId, setJustAddedLineId] = useState<string | null>(null);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, hydrated]);

  const addLine = useCallback((line: Omit<CartLine, 'id'>): string => {
    const id = `line_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newLine: CartLine = { ...line, id };
    setLines((prev) => [...prev, newLine]);
    setJustAddedLineId(id);
    // Clear pulse signal after animation completes
    setTimeout(() => setJustAddedLineId(null), 900);
    return id;
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id !== lineId) return l;
        // Only plain (non-variant, non-bulk) lines can have qty edited
        if (l.bulkLabel || l.variantBreakdown) return l;
        const safeQty = Math.max(1, Math.min(200, quantity));
        return { ...l, quantity: safeQty, lineTotal: safeQty * l.unitPrice };
      }),
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        itemCount,
        subtotal,
        isOpen,
        justAddedLineId,
        addLine,
        updateQuantity,
        removeLine,
        clear,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}