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
    <div className="space-y-16 lg:space-y-24 pb-20 overflow-hidden">
      {/* 1. Category Quick Navigation Bubble Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-4 no-scrollbar justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="flex flex-col items-center group flex-shrink-0"
            >
              <div
                style={{ width: '4.5rem', height: '4.5rem', position: 'relative' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-50 p-1 border-2 border-amber-200/80 group-hover:border-[#1b4332] group-hover:scale-105 transition-all shadow-sm overflow-hidden flex-shrink-0"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="80px"
                  className="object-cover rounded-full"
                />
              </div>
              <span className="text-[12px] sm:text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-[#1b4332] dark:group-hover:text-[#d4a373] transition-colors mt-2 text-center max-w-[85px] sm:max-w-[100px] leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Hero Split Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#102a20] via-[#1b4332] to-[#255740] text-white shadow-2xl p-8 sm:p-14 lg:p-16 border border-[#2d5a45]">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a5944] text-[#f7e6c4] text-xs font-semibold tracking-wider uppercase border border-[#3b7359]">
                <Sparkles className="w-4 h-4 text-[#d4a373]" />
                <span>100% Vedic Bilona • Zero Chemicals</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#f7e6c4] leading-[1.15]">
                Pure, Traditional Foods Delivered Across India
              </h1>

              <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Hand-churned A2 Gir Cow Ghee, stoneground unhybridized Khapli Atta, and cold-pressed Kolhu oils—crafted with ancient wisdom for modern vitality.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <Link
                  href="/collections/all"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#d4a373] hover:bg-[#c39162] text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Shop Pure Foods
                </Link>
                <Link
                  href="/pages/about-us"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent hover:bg-white/10 text-[#f7e6c4] border border-[#f7e6c4]/40 font-semibold text-xs sm:text-sm uppercase tracking-widest transition-colors text-center"
                >
                  Our Heritage
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2d5a45]/80 text-left">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#f7e6c4]">100%</div>
                  <div className="text-[11px] sm:text-xs text-stone-300">Vedic Bilona Ghee</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#f7e6c4]">45+</div>
                  <div className="text-[11px] sm:text-xs text-stone-300">Heritage Farmers</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#f7e6c4]">NABL</div>
                  <div className="text-[11px] sm:text-xs text-stone-300">Lab Tested Batches</div>
                </div>
              </div>
            </div>

            {/* Featured Product Hero Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-2xl">
                <div
                  style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}
                  className="aspect-square w-full rounded-xl overflow-hidden bg-white/95 mb-4"
                >
                  <Image
                    src="https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-1261568460.webp?v=1791458799&width=800"
                    alt="A2 Gir Cow Ghee"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-2 left-2 bg-[#1b4332] text-[#f7e6c4] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    🔥 Most Loved
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4a373]">
                    Gir Cow A2 Desi Ghee
                  </span>
                  <h3 className="font-semibold text-white text-base">
                    Hand Churned Vedic Bilona Ghee
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-lg font-bold text-[#f7e6c4]">₹559.00</span>
                      <span className="text-xs text-stone-400 line-through ml-2">₹699.00</span>
                    </div>
                    <Link
                      href="/products/a2-desi-cow-ghee-hand-churned-from-curd"
                      className="px-4 py-1.5 rounded-lg bg-[#d4a373] text-stone-950 font-bold text-xs uppercase hover:bg-amber-400 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
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
