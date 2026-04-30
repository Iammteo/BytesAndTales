import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { MarqueeNames } from '@/components/MarqueeNames';
import { ThreeThings } from '@/components/ThreeThings';
import { Story } from '@/components/Story';
import { Menu } from '@/components/Menu';
import { Gallery } from '@/components/Gallery';
import { Press } from '@/components/Press';
import { OrderForm } from '@/components/OrderForm';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { CartFloat } from '@/components/CartFloat';
import { CartDrawer } from '@/components/CartDrawer';

export default function Home() {
  return (
    <>
      <Ticker />
      <Nav />
      <main>
        <Hero />
        <MarqueeNames />
        <ThreeThings />
        <Story />
        <Menu />
        <Gallery />
        <Press />
        <OrderForm />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartFloat />
      <CartDrawer />
    </>
  );
}