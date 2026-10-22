import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festive Hampers & Corporate Gifting | Rosier Foods',
  description:
    'Celebrate festivals and milestones with authentic Vedic food gift hampers from Rosier Foods.',
};

export default function HampersPage() {
  const hampers = [
    {
      title: 'The Royal Vedic Brass Hamper',
      price: 3499,
      comparePrice: 4200,
      description: 'Handcrafted pure brass Dolchi filled with 1 Ltr Gir Cow A2 Bilona Ghee, 500g Wild Forest Honey, and 200g Gond Laddoos.',
      image: 'https://www.rosierfoods.com/cdn/shop/files/diwali-hamper.png?v=1791490455&width=800',
      badge: 'Best Gift Seller'
    },
    {
      title: 'Immunity & Heritage Wellness Box',
      price: 1899,
      comparePrice: 2400,
      description: '500g Amlaprash (Chyawanprash) made with organic amla, 500g raw forest honey, and sun-matured Banarasi stuffed red chilly pickle.',
      image: 'https://www.rosierfoods.com/cdn/shop/files/laddoo_mini-b.png?v=1791490469&width=800',
      badge: 'Festive Favorite'
    },
    {
      title: 'Artisanal Kitchen Harvest Hamper',
      price: 2499,
      comparePrice: 2999,
      description: 'Stone pressed Black Mustard Oil, Extra Virgin Virgin Coconut Oil, 2 Kg Ancient Khapli Atta, and Sun Dried Mango Pickle in glass jars.',
      image: 'https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800',
      badge: 'New Launch'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Banner */}
      <div className="rounded-3xl bg-[#102a20] text-white p-8 sm:p-14 text-center space-y-4 shadow-xl border border-[#2d5a45] relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-[#f7e6c4] text-xs font-bold uppercase tracking-wider">
          <Gift className="w-4 h-4 text-[#d4a373]" />
          <span>Thoughtful Vedic Gifting</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f7e6c4]">
          Festive Hampers &amp; Corporate Gifting
        </h1>
        <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
          Gift the blessing of good health. Hand-packaged luxury boxes featuring pure Gir Cow Bilona Ghee in traditional brass dolchis, raw forest honey, and royal Ayurvedic sweets.
        </p>
      </div>

      {/* Hampers Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hampers.map((hamper, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square w-full bg-[#fbf9f5]">
                <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1b4332] text-[#f7e6c4]">
                  {hamper.badge}
                </span>
                <Image
                  src={hamper.image}
                  alt={hamper.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {hamper.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {hamper.description}
                </p>
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-xl font-bold text-stone-900">₹{hamper.price}</span>
                  <span className="text-xs text-stone-400 line-through">₹{hamper.comparePrice}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href="/pages/contact"
                className="w-full py-3 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] text-xs font-bold uppercase tracking-wider block text-center transition-colors shadow-sm"
              >
                Inquire / Order Hamper
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Gifting Inquiry */}
      <div className="rounded-3xl bg-[#fbf9f5] border border-amber-200/80 p-8 sm:p-12 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Looking for Custom Corporate or Wedding Gifting?
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          We offer bespoke customizations, customized brass engraving, custom sleeves, and direct multi-city doorstep fulfillment across India for company orders.
        </p>
        <div className="pt-2">
          <Link
            href="/pages/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider hover:bg-[#123124] transition-colors shadow-md"
          >
            <span>Contact Corporate Gifting Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
