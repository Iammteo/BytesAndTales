// Bytes & Tales — Menu data
// Single source of truth. Edit here, site updates everywhere.

export type BulkOption = {
  qty: number;
  price: number;
  label: string;
};

export type Variant = {
  id: string;
  label: string;
  /** Optional override price (in GBP). If absent, parent's pricePer is used. */
  price?: number;
  /** Optional override unit label (e.g. "small tray"). */
  unitLabel?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: 'Pastry' | 'Cake' | 'Snack';
  description: string;
  pricePer: number;
  pricePerLabel: string;
  bulkOptions?: BulkOption[];
  variants?: Variant[];
  variantLabel?: string;
  minOrder?: number;
  quantityStep?: number;
  allergens: string[];
  leadTime: string;
  signature?: boolean;
  image: string;
  imageAlt: string;
  romanNumeral: string;
};

export const menu: MenuItem[] = [
  {
    id: 'meat-pie',
    name: 'Meat Pie',
    category: 'Pastry',
    description:
      'Golden, buttery pastry packed with peppered minced beef, potato and carrot. The house signature — folded by hand and baked until the edges crackle.',
    pricePer: 2.5,
    pricePerLabel: 'each',
    bulkOptions: [{ qty: 12, price: 30, label: 'box of 12' }],
    minOrder: 6,
    quantityStep: 6,
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    signature: true,
    image: '/images/menu/meat-pie.jpg',
    imageAlt: 'Golden, hand-crimped meat pies in a kraft box',
    romanNumeral: 'i.',
  },
  {
    id: 'chicken-pie',
    name: 'Chicken Pie',
    category: 'Pastry',
    description:
      'Tender chicken in a delicate, herbed filling — folded into the same buttery shortcrust as our meat pie. Lighter, but no less considered.',
    pricePer: 2.5,
    pricePerLabel: 'each',
    bulkOptions: [{ qty: 12, price: 30, label: 'box of 12' }],
    minOrder: 6,
    quantityStep: 6,
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/chicken-pie.jpeg',
    imageAlt: 'Hand-folded chicken pies arranged on a wooden tray',
    romanNumeral: 'ii.',
  },
  {
    id: 'fish-roll',
    name: 'Fish Roll',
    category: 'Pastry',
    description:
      'Seasoned, flaked fish folded into glossy, golden pastry — a soft-bake classic done right. Best eaten warm.',
    pricePer: 3,
    pricePerLabel: 'each',
    bulkOptions: [{ qty: 12, price: 36, label: 'box of 12' }],
    minOrder: 6,
    quantityStep: 6,
    allergens: ['gluten', 'dairy', 'eggs', 'fish'],
    leadTime: '48 hours',
    image: '/images/menu/fish-roll.jpg',
    imageAlt: 'Glossy fish rolls packed in a kraft box',
    romanNumeral: 'iii.',
  },
  {
    id: 'sausage-roll',
    name: 'Sausage Roll',
    category: 'Pastry',
    description:
      'A proper roll — flaky, glossy, generously filled with seasoned beef. Made the long way, with a pinch of nutmeg folded into the meat.',
    pricePer: 3,
    pricePerLabel: 'each',
    bulkOptions: [{ qty: 12, price: 36, label: 'box of 12' }],
    minOrder: 6,
    quantityStep: 6,
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/sausage-roll.jpeg',
    imageAlt: 'Golden sausage rolls revealing seasoned beef filling',
    romanNumeral: 'iv.',
  },
  {
    id: 'puff-puff',
    name: 'Puff Puff',
    category: 'Snack',
    description:
      'Pillowy, nutmeg-kissed dough fried until honeyed and golden. Best ordered by the tray for parties, gatherings, and Sunday afternoons.',
    pricePer: 20, // fallback price (not used; variants have their own)
    pricePerLabel: 'tray',
    variantLabel: 'Choose tray sizes',
    variants: [
      { id: 'small', label: 'Small tray', price: 20, unitLabel: 'small tray' },
      { id: 'medium', label: 'Medium tray', price: 35, unitLabel: 'medium tray' },
      { id: 'large', label: 'Large tray', price: 45, unitLabel: 'large tray' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/puff-puff.jpeg',
    imageAlt: 'Golden, glossy puff puff piled in a bowl',
    romanNumeral: 'v.',
  },
  {
    id: 'banana-bread',
    name: 'Banana Bread',
    category: 'Cake',
    description:
      'Ripe bananas folded into a warm-spiced batter, baked into a tender loaf. Sweet, soft, and perfect with a cup of tea.',
    pricePer: 20,
    pricePerLabel: 'per loaf',
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/loaves.jpg',
    imageAlt: 'A freshly baked banana bread loaf on a wooden board',
    romanNumeral: 'vi.',
  },
];

export const itemsByCategory = (category: MenuItem['category']) =>
  menu.filter((m) => m.category === category);

/**
 * Resolve the actual price for a variant — falling back to the parent pricePer
 * if the variant doesn't override.
 */
export const variantPrice = (item: MenuItem, variantId: string): number => {
  const v = item.variants?.find((x) => x.id === variantId);
  return v?.price ?? item.pricePer;
};

/**
 * Resolve the unit label for a variant.
 */
export const variantUnitLabel = (item: MenuItem, variantId: string): string => {
  const v = item.variants?.find((x) => x.id === variantId);
  return v?.unitLabel ?? item.pricePerLabel;
};