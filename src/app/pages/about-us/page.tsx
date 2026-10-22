import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Users, Sparkles, Award, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story & Heritage | Rosier Foods',
  description:
    'Learn about Rosier Foods, our mission to revive traditional Vedic food practices, and direct partnerships with heritage farmers.',
};

export default function AboutUsPage() {
  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#102a20] text-white py-16 sm:py-24 relative overflow-hidden border-b border-[#1b4332]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4a373]">
            The Rosier Foods Journey
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#f7e6c4] leading-tight">
            जड़ों से जुड़े लोग, असली बदलाव
          </h1>
          <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Rosier Foods was born from a simple yet profound realization: real health cannot be mass-produced in ultra-processed industrial factories. It lives in ancient seeds, unhurried Bilona wooden churners, and direct communion with the soil.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
              The Problem We Saw
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              Modern shortcuts have compromised Indian nutrition
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Supermarket shelves today are flooded with chemical solvent-extracted refined oils, genetically altered dwarf wheat flours devoid of fiber, and synthetic cream-based &lsquo;ghee&rsquo; produced through rapid centrifuges.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our ancestors never consumed stripped foods. They ate whole grains stoneground slowly so the wheat germ remained alive. They consumed A2 Ghee churned from cultured whole curd, packed with gut-healing butyrate and CLA.
            </p>
          </div>
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-lg">
            <Image
              src="https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800"
              alt="Rosier Vedic Ghee Preparation"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="pt-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
              Our Guiding Principles
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The Four Commitments of Rosier Foods
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl">
                🥛
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                100% Vedic Vedic Bilona Churned
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We never touch industrial malai separators. Our A2 Ghee is fermented from whole curd into makhan using bi-directional wooden bilona rods, just as described in the ancient Charaka Samhita.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xl">
                🌾
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Unhybridized Heirloom Grains
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our Khapli (Emmer) wheat is an unadulterated 10,000-year-old grain naturally low in gluten-starch, low GI, and stone-milled at ambient temperatures to protect vitamins and natural germ oils.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl">
                🪔
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Cold Wooden &amp; Stone Kolhu Extraction
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our oils are pressed slowly below 45°C. No boiling, no hexane solvent leaching, and zero artificial clarification. What enters the bottle is the pure essence of raw seeds.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xl">
                🔬
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Radical Laboratory Transparency
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Every batch undergoes third-party NABL analysis for A2 beta-casein DNA, NMR honey purity, and zero adulteration. The test certificates are open for all consumers to verify.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1b4332] text-white text-center space-y-4 shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7e6c4]">
            Experience Real Traditional Nutrition Today
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
            Order directly from our farm pantry and feel the authentic difference in energy, digestion, and taste.
          </p>
          <div className="pt-2">
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#d4a373] text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
