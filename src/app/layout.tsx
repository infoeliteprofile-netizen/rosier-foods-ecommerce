import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'A2 Ghee, Raw Honey, Atta & Cold Pressed Oils | Rosier Foods',
  description:
    'Shop A2 Gir Cow Ghee, Wild Forest Honey, Khapli Atta & Stone Pressed Oils from Rosier Foods. Pure, traditional foods delivered across India.',
  keywords: [
    'A2 Ghee',
    'Gir Cow Ghee',
    'Bilona Ghee',
    'Khapli Atta',
    'Emmer Wheat',
    'Cold Pressed Oil',
    'Mustard Oil',
    'Raw Honey',
    'Chyawanprash',
    'Rosier Foods',
  ],
  openGraph: {
    title: 'Rosier Foods - Pure Traditional Indian Superfoods',
    description:
      'Shop A2 Gir Cow Ghee, Wild Forest Honey, Khapli Atta & Stone Pressed Oils from Rosier Foods.',
    url: 'https://www.rosierfoods.com',
    siteName: 'Rosier Foods',
    images: [
      {
        url: 'https://www.rosierfoods.com/cdn/shop/files/black-logo-01_7f1cd910-121f-49c7-bdcf-248849cd14f5.webp?v=1789128976',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900 selection:bg-amber-200 selection:text-stone-900">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
