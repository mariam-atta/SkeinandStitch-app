import { Fraunces, Work_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartProvider from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import WishlistProvider from '@/context/WishlistContext';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'Skein & Stitch | Handknit & Crochet',
  description: 'Handcrafted crochet clothing, accessories, and bags — made to order.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body
  className="text-ink-900 font-body antialiased"
  style={{ background: '#ded7b9'  }}
>
        <CartProvider>
          <WishlistProvider>
          
          <Header />
           <main className="min-h-screen pt-[124px] lg:pt-[180px]">
            {children}
            </main>
            <Footer />
          <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}