'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, PRODUCTS, TESTIMONIALS } from '@/data/rosier-data';
import ProductCard from '@/components/ProductCard';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  ChevronRight,
  ArrowRight,
  Star,
  Leaf,
  CheckCircle2,
  Quote,
  Flame,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const bestSellers = PRODUCTS.filter((p) => p.featured);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="space-y-12 lg:space-y-20 pb-20 overflow-hidden">
      {/* 1. Main Official Hero Banner ("EVERY BATCH IS LAB TESTED") */}
      <section className="w-full">
        <Link href="/collections/all" className="block relative w-full overflow-hidden group">
          <div className="relative w-full aspect-[2.6/1] sm:aspect-[3/1] max-h-[560px] bg-stone-100 dark:bg-stone-900">
            {/* Desktop Banner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.rosierfoods.com/cdn/shop/files/1_1658a322-943b-4593-a967-af22b89937a2.png?format=webp&v=1792159997&width=1600"
              alt="Rosier Foods - Every Batch is Lab Tested"
              className="hidden sm:block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            {/* Mobile Banner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.rosierfoods.com/cdn/shop/files/2_e43e382b-f10a-46d2-b253-3090037067a5.png?format=webp&v=1792160024&width=800"
              alt="Rosier Foods - Every Batch is Lab Tested"
              className="sm:hidden w-full h-full object-cover"
            />
          </div>
        </Link>
      </section>

      {/* 2. Rosier Split Section: Featured Banners + Category Circular Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: 2 Promotional Banners */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <Link
              href="/pages/hampers"
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-200/80 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.rosierfoods.com/cdn/shop/files/diwali-hamper.png?v=1791490455&width=800"
                alt="Festive Hampers"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/collections/healthy-snacking"
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-200/80 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.rosierfoods.com/cdn/shop/files/laddoo_mini-b.png?v=1791490469&width=800"
                alt="Winter Gond Laddoo"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Right: Category Circular Icons Grid / Slider */}
          <div className="lg:col-span-7">
            <div className="bg-[#fbf9f5] dark:bg-stone-900/60 rounded-3xl p-4 sm:p-6 border border-stone-200/80">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1b4332] dark:text-[#d4a373]">
                  Explore Pure Superfoods
                </span>
                <Link
                  href="/collections/all"
                  className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-[#1b4332] flex items-center gap-1"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 text-center">
                {[
                  {
                    name: 'A2 Ghee',
                    slug: 'ghee',
                    img: 'https://www.rosierfoods.com/cdn/shop/files/Ghee_Icons.png?v=1781252536&width=160',
                  },
                  {
                    name: 'Stone Pressed Oils',
                    slug: 'stone-press-oil',
                    img: 'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=160',
                  },
                  {
                    name: 'Pickles',
                    slug: 'pickles',
                    img: 'https://www.rosierfoods.com/cdn/shop/files/pickles.webp?v=1779380696&width=160',
                  },
                  {
                    name: 'Atta',
                    slug: 'atta',
                    img: 'https://www.rosierfoods.com/cdn/shop/files/atta.webp?v=1779380667&width=160',
                  },
                  {
                    name: 'Snacking',
                    slug: 'healthy-snacking',
                    img: 'https://www.rosierfoods.com/cdn/shop/files/healthy_breakfast.webp?v=1779380735&width=160',
                  },
                  {
                    name: 'Immunity',
                    slug: 'immunity-boosters',
                    img: 'https://www.rosierfoods.com/cdn/shop/files/immunity_bosters.webp?v=1779380753&width=160',
                  },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/collections/${item.slug}`}
                    className="group flex flex-col items-center p-2 rounded-2xl hover:bg-white dark:hover:bg-stone-800 transition-all duration-200"
                  >
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white dark:bg-stone-800 p-2 border border-stone-200/80 group-hover:border-[#1b4332] group-hover:scale-105 transition-all shadow-sm flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-[#1b4332] dark:group-hover:text-[#d4a373] mt-2 leading-tight">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lab Tested Certificate Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#f4ece1] dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] text-[#f7e6c4] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NABL Accredited Laboratory Reports</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1b4332] dark:text-[#f7e6c4] leading-tight">
                Every Single Batch Is 100% Lab Tested
              </h2>
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                We believe trust is earned through radical transparency. Every lot of Gir Cow A2 Ghee, Stone Pressed Oil, and Raw Honey undergoes rigorous testing for A2 Beta-Casein, heavy metals, adulterants, and purity index.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/pages/lab-test-reports"
                  className="px-6 py-3 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#143427] font-bold text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  View Lab Reports →
                </Link>
                <Link
                  href="/collections/all"
                  className="px-6 py-3 rounded-xl bg-white/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-white font-semibold text-xs uppercase tracking-widest transition-all"
                >
                  Shop Tested Batches
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-700 bg-white max-w-md w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.rosierfoods.com/cdn/shop/files/freepik-website.webp?v=1778905482&width=800"
                  alt="Rosier Foods Lab Tested"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Loved Across Generations (Best Sellers Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-800 mb-1">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
              Loved Across Generations
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Time-honored recipes slow-crafted with unwavering Vedic purity.
            </p>
          </div>
          <Link
            href="/collections/best-sellers"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1b4332] hover:text-[#123124] uppercase tracking-wider group"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Scrolling Mid-Page Promotion Ticker */}
      <section className="bg-[#1b4332] py-4 border-y border-[#2d5a45] overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-[#f7e6c4] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase px-4">
            <span>FOODS THAT HEAL, NOT HYPE</span>
            <span>•</span>
            <span>PURE | TRADITIONAL | ETHICALLY CRAFTED</span>
            <span>•</span>
            <span>100% VEDIC BILONA GHEE</span>
            <span>•</span>
            <span>ZERO PRESERVATIVES OR ADDITIVES</span>
            <span>•</span>
            <span>STONEGROUND ANCIENT GRAINS</span>
            <span>•</span>
            <span>DIRECT RELATIONSHIP WITH FARMERS</span>
            <span>•</span>
            <span>FOODS THAT HEAL, NOT HYPE</span>
            <span>•</span>
            <span>PURE | TRADITIONAL | ETHICALLY CRAFTED</span>
            <span>•</span>
            <span>100% VEDIC BILONA GHEE</span>
            <span>•</span>
            <span>ZERO PRESERVATIVES OR ADDITIVES</span>
            <span>•</span>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-800 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Fresh From The Harvest</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Freshly ground heirloom grains, handcrafted winter laddoos &amp; sun-matured pickles.
            </p>
          </div>
          <Link
            href="/collections/new-launch"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1b4332] hover:text-[#123124] uppercase tracking-wider group"
          >
            <span>View All New Launches</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Heritage Story & Roots ("More Than a Brand, A Family") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#f4ece1] border border-amber-200/80 p-8 sm:p-14 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-900">
              More Than A Brand, A Family
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102a20] leading-tight">
              जड़ों से जुड़े लोग, असली बदलाव
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              At Rosier Foods, we believe true nourishment begins at the source. We don&apos;t purchase through opaque corporate brokers. Instead, we partner directly with multigenerational farming families who cultivate indigenous heritage seeds, nurse native Gir cows with kindness, and preserve India&apos;s ancient culinary wisdom.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-300">
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#1b4332]">
                  5,000+
                </span>
                <span className="text-xs text-stone-600 font-medium">Indigenous Gir Cows</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#1b4332]">
                  45+
                </span>
                <span className="text-xs text-stone-600 font-medium">Farming Families</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#1b4332]">
                  150k+
                </span>
                <span className="text-xs text-stone-600 font-medium">Homes Nourished</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#1b4332]">
                  100%
                </span>
                <span className="text-xs text-stone-600 font-medium">Pure &amp; Traceable</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/pages/about-us"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-widest hover:bg-[#123124] transition-colors shadow-md"
              >
                <span>Read Our Complete Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The Rosier Foods Experience (4 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1b4332]">
            The Rosier Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            असली स्वाद की एक सच्ची यात्रा
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Every step honored with patience, reverence, and complete laboratory transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl mb-4">
              🌱
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-2">Source To Table</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Direct relationships with heritage grain farmers, guaranteeing sustainable natural farming and ethical crop rotation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xl mb-4">
              🏺
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-2">Time-Honored Techniques</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Slow Bilona churning from cultured curd, traditional stone-milling, and sun-matured terracotta aging.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl mb-4">
              ✨
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-2">Unwavering Purity</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero refined oils, zero synthetic preservatives, zero emulsifiers. Pure, wholesome nutrition just as nature intended.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xl mb-4">
              🤝
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-2">Commitment to Community</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Fair trade pricing and direct financial support to rural farming families and women artisans.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials & Real Stories Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102a20] rounded-3xl p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          <Quote className="absolute top-6 right-6 w-24 h-24 text-white/5 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-[#f7e6c4] text-xs font-semibold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-[#d4a373] text-[#d4a373]" />
              <span>Real Customer Stories</span>
            </div>

            <div className="min-h-[160px] flex flex-col justify-center">
              <p className="font-serif text-lg sm:text-2xl text-stone-100 italic leading-relaxed">
                &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
              </p>
            </div>

            <div className="space-y-1 pt-4 border-t border-[#1f4a38]">
              <div className="font-bold text-[#f7e6c4] text-base">
                {TESTIMONIALS[activeTestimonial].author}
              </div>
              <div className="text-xs text-stone-400">
                {TESTIMONIALS[activeTestimonial].role}
              </div>
              <div className="text-xs text-[#d4a373] font-medium pt-1">
                Product: {TESTIMONIALS[activeTestimonial].product}
              </div>
            </div>

            {/* Testimonial Selectors */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeTestimonial === idx
                      ? 'w-8 bg-[#d4a373]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Purity & Lab Certified Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-[#1b4332] uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Full Purity Transparency</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Every Single Batch Tested In NABL Accredited Labs
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              We publicly publish our A2 Beta-Casein DNA tests, NMR honey profiles, and heavy metal screenings. Complete peace of mind for you and your loved ones.
            </p>
          </div>

          <Link
            href="/pages/lab-test-reports"
            className="px-6 py-3 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap"
          >
            Inspect Lab Reports
          </Link>
        </div>
      </section>
    </div>
  );
}
