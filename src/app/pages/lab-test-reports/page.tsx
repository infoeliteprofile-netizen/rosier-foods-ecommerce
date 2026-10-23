'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LAB_REPORT_PRODUCTS, LAB_REPORTS } from '@/data/rosier-data';
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  X
} from 'lucide-react';

export default function LabTestReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const filteredProducts = LAB_REPORT_PRODUCTS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#fbf9f5] dark:bg-[#0c1310] min-h-screen">
      {/* 1. Hero Banner: Exactly matching Rosier Foods "EVERY BATCH IS LAB TESTED" */}
      <section className="w-full">
        <div className="relative w-full aspect-[2.6/1] sm:aspect-[3/1] max-h-[520px] bg-stone-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.rosierfoods.com/cdn/shop/files/1_1658a322-943b-4593-a967-af22b89937a2.png?format=webp&v=1792159997&width=1600"
            alt="Every Batch Is Lab Tested - Rosier Foods"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. Main Lab Reports Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-stone-900 dark:text-stone-100 uppercase">
            LAB REPORTS FOR ALL THE PRODUCTS
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Click on any product below to inspect the verified independent laboratory test report for purity, DNA authenticity, and zero adulteration.
          </p>

          {/* Quick Search in Reports */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by product name (e.g. Ghee, Paneer, Honey)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#1b4332] dark:focus:border-[#d4a373] text-stone-800 dark:text-stone-200 shadow-sm"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. 4-Column Product Grid (Matching exact 1:1 Rosier layout from image) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Product Image Card */}
              <div className="w-full aspect-square rounded-2xl bg-white dark:bg-stone-800/80 p-3 sm:p-5 border border-stone-200/90 dark:border-stone-700/60 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Product Title */}
              <h3 className="font-medium text-stone-900 dark:text-stone-100 text-xs sm:text-sm mt-3.5 leading-snug">
                {item.title}
              </h3>

              {/* Underlined Direct Report Link */}
              <a
                href={item.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 text-[11px] sm:text-xs font-semibold text-stone-800 dark:text-stone-300 underline underline-offset-4 decoration-stone-400 hover:decoration-[#1b4332] hover:text-[#1b4332] dark:hover:text-[#d4a373] uppercase tracking-wider transition-colors inline-flex items-center gap-1"
              >
                <span>CHECK LAB TEST REPORT</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1b4332] -rotate-45" />
              </a>
            </div>
          ))}
        </div>

        {/* Empty search results fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            No products found matching &quot;{searchQuery}&quot;. Clear search to view all 32 lab test certificates.
          </div>
        )}

        {/* 4. Trust Summary Highlights */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-1">
              NABL Accredited Labs
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Every single batch is analyzed by government-certified national food laboratories before bottling.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-1">
              Zero Chemical Residues
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Screened for heavy metals (lead, cadmium, arsenic), synthetic pesticides, and prohibited chemical additives.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-center">
            <FileText className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-1">
              A2 DNA &amp; NMR Verified
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Nuclear Magnetic Resonance (NMR) authenticates honey and genetic testing certifies pure Gir cow A2 Beta-Casein.
            </p>
          </div>
        </div>

        {/* 5. Trust Badges Banner Strip (ISO, FSSAI, NABL, GMP, etc.) */}
        <div className="mt-16 pt-8 border-t border-stone-200/80 dark:border-stone-800 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.rosierfoods.com/cdn/shop/files/Group_140989.png?v=1748263798&width=2048"
            alt="Rosier Foods Certifications: FSSAI, ISO, NABL, Organic India, GMP, Jaivik Bharat"
            className="max-w-2xl w-full h-auto opacity-85 object-contain"
          />
        </div>
      </main>
    </div>
  );
}
