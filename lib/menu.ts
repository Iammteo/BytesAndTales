// Bytes & Tales — Menu data
// Single source of truth. Edit here, site updates everywhere.
//
// PLACEHOLDER PRICES — replace with real prices when client confirms

export type BulkOption = {
  qty: number;
  price: number;
  label: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: 'Pastry' | 'Cake';
  description: string;
  pricePer: number;
  pricePerLabel: string;
  bulkOptions?: BulkOption[];
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
    pricePer: 3.5,
    pricePerLabel: 'per piece',
    bulkOptions: [
      { qty: 6, price: 18, label: 'box of 6' },
      { qty: 12, price: 35, label: 'box of 12' },
      { qty: 24, price: 65, label: 'box of 24' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    signature: true,
    image: '/images/menu/meat-pie.jpg',
    imageAlt: 'Golden, hand-crimped meat pies in a kraft box',
    romanNumeral: 'i.',
  },
  {
    id: 'sausage-roll',
    name: 'Sausage Roll',
    category: 'Pastry',
    description:
      'A proper roll — flaky, glossy, generously filled with seasoned beef. Made the long way, with a pinch of nutmeg folded into the meat.',
    pricePer: 3,
    pricePerLabel: 'per roll',
    bulkOptions: [
      { qty: 6, price: 16, label: 'box of 6' },
      { qty: 12, price: 30, label: 'box of 12' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/sausage-roll.jpg',
    imageAlt: 'Golden sausage rolls stacked in a kraft box',
    romanNumeral: 'ii.',
  },
  {
    id: 'cocktail-sausage-roll',
    name: 'Cocktail Sausage Roll',
    category: 'Pastry',
    description:
      'Smaller, sharper, perfect with drinks — a single bite that disappears too quickly. Best ordered by the dozen for parties and gatherings.',
    pricePer: 1.5,
    pricePerLabel: 'per piece',
    bulkOptions: [
      { qty: 12, price: 16, label: 'dozen' },
      { qty: 24, price: 30, label: 'two dozen' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/mixed-box.jpg',
    imageAlt: 'Cocktail sausage rolls beside meat pies in a kraft box',
    romanNumeral: 'iii.',
  },
  {
    id: 'coconut-loaf',
    name: 'Coconut Loaf',
    category: 'Cake',
    description:
      'Toasted-coconut top, soft crumb beneath. Sweet but not too sweet — the kind of loaf that disappears slice by slice over a long afternoon.',
    pricePer: 18,
    pricePerLabel: 'per loaf',
    allergens: ['gluten', 'dairy', 'eggs'],
    leadTime: '48 hours',
    image: '/images/menu/loaves.jpg',
    imageAlt: 'Coconut-topped loaf cake on a wooden board',
    romanNumeral: 'iv.',
  },
  {
    id: 'banana-cashew-loaf',
    name: 'Banana & Cashew Loaf',
    category: 'Cake',
    description:
      'Ripe bananas folded into a warm-spiced batter, finished with toasted cashews. Tea-time perfection.',
    pricePer: 20,
    pricePerLabel: 'per loaf',
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'],
    leadTime: '48 hours',
    image: '/images/menu/loaves.jpg',
    imageAlt: 'Banana and cashew loaf cake',
    romanNumeral: 'v.',
  },
  {
    id: 'oreo-loaf',
    name: 'Oreo Loaf',
    category: 'Cake',
    description:
      'Chocolate sponge studded with whole Oreo halves. A house favourite for birthdays and unexpected weeknight celebrations.',
    pricePer: 22,
    pricePerLabel: 'per loaf',
    allergens: ['gluten', 'dairy', 'eggs', 'soy'],
    leadTime: '48 hours',
    image: '/images/menu/loaves.jpg',
    imageAlt: 'Oreo-studded chocolate loaf cake',
    romanNumeral: 'vi.',
  },
];

export const itemsByCategory = (category: MenuItem['category']) =>
  menu.filter((m) => m.category === category);
