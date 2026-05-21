# Bytes & Tales

A Manchester pastry house. Hand-folded meat pies, sausage rolls, and home-style loaves.

> **Built by Klavoir Technologies** · Next.js 14 · TypeScript · Tailwind CSS

---

## Quick start

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Run production build locally
npm start
```

---

## Project structure

```
bytes-and-tales/
├── app/
│   ├── globals.css       # Global styles + paper grain texture
│   ├── layout.tsx        # Root layout, fonts, SEO meta
│   └── page.tsx          # Main page composing all sections
├── components/
│   ├── Logo.tsx          # Brand logo with variants
│   ├── Ticker.tsx        # Top scrolling bar
│   ├── Nav.tsx           # Sticky navigation
│   ├── Hero.tsx          # Hero with real product photo
│   ├── MarqueeNames.tsx  # Scrolling menu names
│   ├── ThreeThings.tsx   # "Three things, done well" section
│   ├── Story.tsx         # About / story section
│   ├── Menu.tsx          # Full menu with WhatsApp ordering
│   ├── Gallery.tsx       # Photo gallery
│   ├── Press.tsx         # Customer testimonials
│   ├── OrderForm.tsx     # Bulk/custom enquiry form
│   ├── Footer.tsx        # Footer with mega wordmark
│   └── WhatsAppFloat.tsx # Floating WhatsApp button
├── lib/
│   ├── menu.ts           # Menu items — single source of truth
│   └── site.ts           # Site config (WhatsApp number, domain, etc.)
└── public/
    └── images/
        ├── brand/        # Logo files
        └── menu/         # Product photography
```

---

## Updating content

### Menu items

All menu data lives in **`lib/menu.ts`**. Edit this file to update:
- Item names
- Prices (per unit and bulk options)
- Descriptions
- Allergens
- Photos

The site automatically updates the menu section, marquee, and footer.

### Site config

Update **`lib/site.ts`** to change:
- WhatsApp Business number (currently a placeholder!)
- Email address
- Instagram handle
- Operating hours
- Delivery area
- Food Hygiene Rating

### Photos

Drop new images into `public/images/menu/` and reference them in `lib/menu.ts`.

For best performance:
- Resize to max 2000px wide
- Compress with TinyPNG or ImageOptim
- Use `.jpg` for photos, `.png` for graphics with transparency

---

## Brand assets

- **Logo**: `public/images/brand/logo.png` (geometric B mark + wordmark)
- **Colours**: see `tailwind.config.ts`
  - Wine `#6B1A24`
  - Orange `#D9531E`
  - Cream `#F5EFE6`
  - Ink `#1A0F0C`
- **Fonts** (loaded from Google Fonts):
  - Display: Fraunces (serif)
  - Serif body: Cormorant Garamond
  - Sans / UI: Archivo

---

## Support

Built and maintained by **Klavoir Technologies**.
Contact: [ola@klavoir.com](mailto:ola@klavoir.com)


