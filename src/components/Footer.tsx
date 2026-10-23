'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckCircle2, ShieldCheck, ChevronUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#102a20] text-stone-200 pt-10 pb-12">
      {/* Decorative Wave Transition (Dune Curve matching Rosier website) */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full overflow-hidden leading-none pointer-events-none select-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#102a20] fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,85 350,-20 500,45 C650,110 850,20 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Brand Promise Banner */}
        <div className="bg-[#1b4332] rounded-3xl p-8 sm:p-12 mb-16 shadow-xl border border-[#2d5a45] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4a373] font-bold">
              Join the Rosier Family
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7e6c4] leading-tight">
              Get 10% Off Your First Vedic Nutrition Order
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              Subscribe to receive ancient heirloom recipes, lab test reports, seasonal harvest notifications, and wellness wisdom straight from Indian farms.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-emerald-900/60 border border-emerald-500/50 rounded-2xl p-4 text-center text-sm text-[#f7e6c4] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Thank you! Use coupon <strong>ROSIER10</strong> at checkout for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0f281e] text-white border border-[#2d5a45] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#d4a373] hover:bg-[#c39162] text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1f4a38]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4a373] flex items-center justify-center text-[#102a20] font-serif font-bold text-lg">
                  R
                </div>
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#f7e6c4] uppercase">
                  ROSIER
                </span>
              </div>
              <span className="text-[9px] tracking-[0.35em] text-[#d4a373] uppercase font-bold -mt-0.5">
                FOODS OF INDIA
              </span>
            </Link>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Pure, traditional, and ethically crafted foods. We bring ancient Vedic culinary wisdom to modern tables through slow Bilona churning, cold stone milling, and direct partnerships with heritage grain farmers.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
              <span>FSSAI License: 10821005000492 | ISO &amp; NABL Tested</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b4332] hover:bg-[#d4a373] hover:text-[#102a20] flex items-center justify-center transition-colors text-stone-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b4332] hover:bg-[#d4a373] hover:text-[#102a20] flex items-center justify-center transition-colors text-stone-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b4332] hover:bg-[#d4a373] hover:text-[#102a20] flex items-center justify-center transition-colors text-stone-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136c-1.871-.502-9.376-.502-9.376-.502s-7.504 0-9.377.502a3.016 3.016 0 0 0-2.122 2.136c-.5 1.884-.5 5.814-.5 5.814s0 3.93.5 5.814a3.016 3.016 0 0 0 2.122 2.136c1.873.502 9.377.502 9.377.502s7.505 0 9.377-.502a3.016 3.016 0 0 0 2.122-2.136c.5-1.884.5-5.814.5-5.814s0-3.93-.5-5.814zm-13.498 9.814v-8l6.545 4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#d4a373]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li>
                <Link href="/collections/ghee" className="hover:text-[#f7e6c4] transition-colors">
                  Gir Cow A2 Desi Ghee
                </Link>
              </li>
              <li>
                <Link href="/collections/atta" className="hover:text-[#f7e6c4] transition-colors">
                  Khapli &amp; Stoneground Atta
                </Link>
              </li>
              <li>
                <Link href="/collections/stone-press-oil" className="hover:text-[#f7e6c4] transition-colors">
                  Stone Pressed Oils
                </Link>
              </li>
              <li>
                <Link href="/collections/pickles" className="hover:text-[#f7e6c4] transition-colors">
                  Sun Dried Pickles
                </Link>
              </li>
              <li>
                <Link href="/collections/healthy-snacking" className="hover:text-[#f7e6c4] transition-colors">
                  Healthy Breakfast &amp; Snacks
                </Link>
              </li>
              <li>
                <Link href="/collections/immunity-booster" className="hover:text-[#f7e6c4] transition-colors">
                  Immunity Booster &amp; Honey
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-[#f7e6c4] font-semibold transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Helpful Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#d4a373]">
              Helpful Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li>
                <Link href="/pages/about-us" className="hover:text-[#f7e6c4] transition-colors">
                  Our Story &amp; Heritage
                </Link>
              </li>
              <li>
                <Link href="/pages/lab-test-reports" className="hover:text-[#f7e6c4] transition-colors">
                  Lab Test Reports
                </Link>
              </li>
              <li>
                <Link href="/pages/hampers" className="hover:text-[#f7e6c4] transition-colors">
                  Festive Gift Hampers
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping-policy" className="hover:text-[#f7e6c4] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/refund-policy" className="hover:text-[#f7e6c4] transition-colors">
                  Refund &amp; Return Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/privacy-policy" className="hover:text-[#f7e6c4] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/terms-of-service" className="hover:text-[#f7e6c4] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#d4a373]">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4a373] flex-shrink-0 mt-0.5" />
                <span>Rosier Foods, Sector 48, Gurugram, Haryana - 122018, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4a373] flex-shrink-0" />
                <span>+91 99999 87654 (Mon-Sat, 9AM-7PM)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4a373] flex-shrink-0" />
                <a href="mailto:care@rosierfoods.com" className="hover:underline">
                  care@rosierfoods.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Rosier Foods Private Limited. All Rights Reserved. Built with Next.js &amp; PostgreSQL.
          </div>
          <div className="flex items-center gap-2 text-stone-400 text-[11px]">
            <span className="px-2 py-1 rounded bg-[#1b4332] text-[#f7e6c4] font-medium">UPI</span>
            <span className="px-2 py-1 rounded bg-[#1b4332] text-[#f7e6c4] font-medium">RuPay</span>
            <span className="px-2 py-1 rounded bg-[#1b4332] text-[#f7e6c4] font-medium">Visa</span>
            <span className="px-2 py-1 rounded bg-[#1b4332] text-[#f7e6c4] font-medium">Mastercard</span>
            <span className="px-2 py-1 rounded bg-[#1b4332] text-[#f7e6c4] font-medium">NetBanking</span>
            <span className="px-2 py-1 rounded bg-[#1b4332] text-[#f7e6c4] font-medium">Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll To Top Button (matching screenshot) */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-30 w-10 h-10 rounded-full bg-[#8c6b45] hover:bg-[#a67c52] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
