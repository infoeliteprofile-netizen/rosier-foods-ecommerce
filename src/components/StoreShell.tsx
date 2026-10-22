'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Isolated standalone admin dashboard (no customer header, no customer footer, no cart drawer)
    return <main className="min-h-screen bg-stone-100 dark:bg-[#0c1310]">{children}</main>;
  }

  // Customer storefront shell
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
