// Bytes & Tales — Cart types & WhatsApp message builder

import { site } from './site';

export type CartLine = {
  id: string; // unique line id
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  unitLabel: string;
  lineTotal: number;
  bulkLabel?: string;
  /** Human-readable breakdown for variant lines, e.g. "2 Small tray, 1 Medium tray" */
  variantBreakdown?: string;
  imageUrl?: string;
};

export const buildWhatsAppCartUrl = (params: {
  lines: CartLine[];
  subtotal: number;
  postcode: string;
  date: string;
  notes?: string;
}): string => {
  const { lines, subtotal, postcode, date, notes } = params;

  const grandTotal = subtotal + site.deliveryFee;

  const itemLines = lines.map((line) => {
    const label = line.bulkLabel ?? line.variantBreakdown ?? line.unitLabel;
    return `• ${line.quantity}× ${line.productName} — ${label} — £${line.lineTotal.toFixed(2)}`;
  });

  const messageLines = [
    `Hi Bytes & Tales! I'd like to place an order:`,
    ``,
    ...itemLines,
    ``,
    `💷 Subtotal: £${subtotal.toFixed(2)}`,
    `🚚 Delivery: £${site.deliveryFee.toFixed(2)} (${site.deliveryArea})`,
    `💰 Grand total: £${grandTotal.toFixed(2)}`,
    ``,
    `📍 Postcode: ${postcode}`,
    `📅 Preferred date: ${date}`,
  ];

  if (notes && notes.trim().length > 0) {
    messageLines.push(`📝 Notes: ${notes.trim()}`);
  }

  messageLines.push('', 'Thank you!');

  const message = messageLines.join('\n');
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
};