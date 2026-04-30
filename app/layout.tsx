import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';

export const metadata: Metadata = {
  title: 'Bytes & Tales — A Manchester Pastry House',
  description:
    'Hand-folded meat pies, sausage rolls, and home-style loaves. Small bites, big delight. Made in Manchester, delivered across Greater Manchester.',
  keywords: [
    'Manchester pastries',
    'meat pie Manchester',
    'sausage roll delivery',
    'Nigerian pastries Manchester',
    'home-baked goods',
    'bytes and tales',
  ],
  openGraph: {
    title: 'Bytes & Tales — A Manchester Pastry House',
    description: 'Small bites. Big delight. Hand-folded pastries delivered across Greater Manchester.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://bytesandtales.co.uk',
    siteName: 'Bytes & Tales',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bytes & Tales — A Manchester Pastry House',
    description: 'Small bites. Big delight.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Archivo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}