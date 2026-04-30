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
    pricePer: 20,
    pricePerLabel: 'small tray',
    bulkOptions: [
      { qty: 1, price: 20, label: 'small tray' },
      { qty: 1, price: 35, label: 'medium tray' },
      { qty: 1, price: 45, label: 'large tray' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/puff-puff.jpeg',
    imageAlt: 'Golden, glossy puff puff piled in a bowl',
    romanNumeral: 'v.',
  },
  {
    id: 'banana-bread',
    name: 'Bread',
    category: 'Cake',
    description:
      'House-baked loaves, four ways. Tender crumb, warm-spiced batter, and a different finish on each — order one or mix the box.',
    pricePer: 20,
    pricePerLabel: 'per loaf',
    variantLabel: 'Choose flavours',
    variants: [
      { id: 'classic', label: 'Classic' },
      { id: 'coconut', label: 'Coconut' },
      { id: 'cashew', label: 'Cashew Nut' },
      { id: 'oreo', label: 'Oreo' },
    ],
    allergens: ['gluten', 'dairy', 'eggs', 'nuts (cashew variant)', 'soy (Oreo variant)'],
    leadTime: '48 hours',
    image: '/images/menu/loaves.jpg',
    imageAlt: 'Four house loaves on a wooden tray, each with a different topping',
    romanNumeral: 'vi.',
  },
];

export const itemsByCategory = (category: MenuItem['category']) =>
  menu.filter((m) => m.category === category);