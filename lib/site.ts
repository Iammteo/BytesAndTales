// Bytes & Tales — Site configuration
// Update these values when the client confirms; site updates everywhere.

export const site = {
  name: 'Bytes & Tales',
  tagline: 'Small bites. Big delight.',
  domain: 'bytesandtales.co.uk',
  url: 'https://bytesandtales.co.uk',

  // Location
  city: 'Manchester',
  region: 'Accross United Kingdom',
  established: '2024',

  // Contact
  whatsappNumber: '447835049957', // No leading + or 0; UK format
  whatsappDisplay: '+44 7835 049 957',
  email: 'ola@bytesandtales.co.uk', // TODO: confirm
  instagram: 'bytes.and.tales',

  // Operating
  hours: 'Mon – Sat · 9am – 5pm',
  leadTimeMin: '48 hours',
  deliveryArea: 'Across United Kingdom ',
  deliveryFee: 12, // GBP, flat rate

  // Legal
  foodHygieneRating: '5',
  localAuthority: 'Manchester City Council',
};

// ============================================================
// WhatsApp helpers
// ============================================================

/**
 * Build a complete WhatsApp order message from modal-collected details.
 * Used by the QuickOrderModal — generates the full structured message
 * with all customer-provided info filled in.
 */
export const buildWhatsAppFullOrderUrl = (params: {
  itemName: string;
  quantity: number;
  unitPrice: number;
  unitLabel: string; // e.g. "per piece", "per loaf"
  total: number;
  postcode: string;
  date: string; // human-readable date string
  notes?: string;
  bulkLabel?: string; // e.g. "box of 12" if it's a bulk order
}) => {
  const {
    itemName,
    quantity,
    unitPrice,
    unitLabel,
    total,
    postcode,
    date,
    notes,
    bulkLabel,
  } = params;

  const itemLine = bulkLabel
    ? `${quantity}× ${itemName} (${bulkLabel})`
    : `${quantity}× ${itemName}`;

  const priceLine = bulkLabel
    ? `£${total.toFixed(2)} subtotal`
    : `£${unitPrice.toFixed(2)} ${unitLabel} · £${total.toFixed(2)} subtotal`;

  const grandTotal = total + site.deliveryFee;

  const lines = [
    `Hi Bytes & Tales! I'd like to place an order:`,
    ``,
    `🥐 ${itemLine}`,
    `💷 ${priceLine}`,
    `🚚 Delivery: £${site.deliveryFee.toFixed(2)} (${site.deliveryArea})`,
    `💰 Grand total: £${grandTotal.toFixed(2)}`,
    `📍 Postcode: ${postcode}`,
    `📅 Preferred date: ${date}`,
  ];

  if (notes && notes.trim().length > 0) {
    lines.push(`📝 Notes: ${notes.trim()}`);
  }

  lines.push('', 'Thank you!');

  const message = lines.join('\n');
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * General "say hello" WhatsApp link for the floating button and footer.
 */
export const buildWhatsAppGeneralUrl = (text?: string) => {
  const defaultMessage =
    text ||
    `Hi Bytes & Tales — I'd like to place an order. Could you let me know what you have available and your lead times? Thank you!`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
};

/**
 * Format a date string from <input type="date"> (YYYY-MM-DD)
 * into a human-readable form ("Saturday, 3 May 2026").
 */
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  try {
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
};