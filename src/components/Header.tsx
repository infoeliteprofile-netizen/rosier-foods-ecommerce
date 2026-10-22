'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORIES } from '@/data/rosier-data';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  FileText,
  Sun,
  Moon,
  Settings
} from 'lucide-react';
import SearchModal from './SearchModal';

export default function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { mode, toggleMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Scrolling Promotion Bar */}
      <div className="bg-[#1b4332] text-[#f7e6c4] text-xs py-2 px-4 overflow-hidden select-none border-b border-[#2d5a45]">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-medium tracking-wider">
            <span className="inline-block animate-pulse">⏰</span>
            <span>SALE ENDING TONIGHT: USE CODE <strong className="bg-[#f7e6c4] text-[#1b4332] px-1.5 py-0.5 rounded text-[10px] tracking-widest font-bold">ROSIER10</strong> FOR 10% OFF</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#e8d5b5]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4a373]" /> Certified Pure Vedic Bilona
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" /> Free Shipping Over ₹499
            </span>
            <span>India (INR ₹)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200'
            : 'bg-[#fbf9f5] border-b border-stone-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-[#1b4332] focus:outline-none"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation Left */}
            <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-stone-800 tracking-normal">
              <Link
                href="/"
                className={`transition-colors hover:text-[#1b4332] ${
                  pathname === '/' ? 'text-[#1b4332] font-semibold' : ''
                }`}
              >
                Home
              </Link>

              {/* Shop Megamenu Hover */}
              <div
                className="relative group py-6"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  href="/collections/all"
                  className={`flex items-center gap-1.5 transition-colors hover:text-[#1b4332] ${
                    pathname.startsWith('/collections') ? 'text-[#1b4332] font-semibold' : ''
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-stone-500" />
                </Link>

                {/* Dropdown Menu */}
                {isShopDropdownOpen && (
                  <div className="absolute top-[70px] left-0 w-[640px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-5 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/collections/${cat.slug}`}
                        className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fbf9f5] transition-colors border border-transparent hover:border-amber-200/70"
                      >
                        <span className="text-2xl p-1.5 rounded-lg bg-amber-50 group-hover/item:bg-amber-100/80 transition-colors">
                          {cat.icon}
                        </span>
                        <div>
                          <div className="font-semibold text-stone-900 group-hover/item:text-[#1b4332] text-sm">
                            {cat.name}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1">
                            {cat.tagline || cat.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 px-1">
                      <span className="font-medium text-[#1b4332]">100% Pure &amp; Traditional Superfoods</span>
                      <Link
                        href="/collections/all"
                        className="font-bold text-[#1b4332] hover:underline flex items-center gap-1"
                      >
                        View All Collections →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/pages/about-us"
                className={`transition-colors hover:text-[#1b4332] ${
                  pathname === '/pages/about-us' ? 'text-[#1b4332] font-semibold' : ''
                }`}
              >
                Our Story
              </Link>

              <Link
                href="/pages/lab-test-reports"
                className={`transition-colors hover:text-[#1b4332] ${
                  pathname === '/pages/lab-test-reports' ? 'text-[#1b4332] font-semibold' : ''
                }`}
              >
                Lab Reports
              </Link>

              <Link
                href="/pages/hampers"
                className={`transition-colors hover:text-[#1b4332] ${
                  pathname === '/pages/hampers' ? 'text-[#1b4332] font-semibold' : ''
                }`}
              >
                Hampers
              </Link>
            </nav>

            {/* Rosier Foods Center Logo */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center">
              <Link href="/" className="inline-flex items-center">
                {/* Real Rosier Logo with SVG fallback */}
                <div className="relative w-36 sm:w-44 h-12 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.rosierfoods.com/cdn/shop/files/black-logo-01_7f1cd910-121f-49c7-bdcf-248849cd14f5.webp?v=1789128976&width=300"
                    alt="Rosier Foods - Nature's Love"
                    className="max-h-12 w-auto object-contain"
                    onError={(e) => {
                      // Fallback text if network blocks external asset
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = document.getElementById('logo-fallback-text');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    id="logo-fallback-text"
                    style={{ display: 'none' }}
                    className="flex-col items-center"
                  >
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1b4332] uppercase">
                      ROSIER
                    </span>
                    <span className="text-[9px] tracking-[0.25em] text-[#8c6b45] uppercase font-semibold">
                      Nature&apos;s Love
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Desktop Inline Search Bar matching Rosier official website */}
              <div
                onClick={() => setIsSearchOpen(true)}
                className="hidden xl:flex items-center justify-between w-52 sm:w-64 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-300 text-xs text-stone-500 hover:border-[#1b4332] transition-colors cursor-pointer shadow-sm group"
              >
                <span className="text-stone-400 group-hover:text-stone-600 select-none">
                  Search products
                </span>
                <Search className="w-4 h-4 text-stone-500 group-hover:text-[#1b4332] transition-colors" />
              </div>

              {/* Mobile / Tablet Search Icon */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="xl:hidden p-2 text-stone-700 hover:text-[#1b4332] dark:text-stone-300 transition-colors rounded-full hover:bg-stone-200/60"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark/Light Mode Toggle */}
              <button
                type="button"
                onClick={toggleMode}
                className="p-2 text-stone-700 hover:text-[#1b4332] dark:text-stone-300 dark:hover:text-[#d4a373] transition-colors rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800"
                aria-label="Toggle theme mode"
                title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

              {/* User Account */}
              <Link
                href="/account"
                className="p-2 text-stone-700 hover:text-[#1b4332] dark:text-stone-300 transition-colors rounded-full hover:bg-stone-200/60"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger with Red Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-stone-700 hover:text-[#1b4332] dark:text-stone-300 transition-colors rounded-full hover:bg-stone-200/60"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  className={`absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-all ${
                    itemCount > 0 ? 'bg-[#c52b2b]' : 'bg-[#c52b2b]/80'
                  }`}
                >
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-stone-100">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#fbf9f5] text-xs font-semibold text-stone-800"
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>

            <div className="space-y-2 text-sm font-medium text-stone-700">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#1b4332]"
              >
                Home
              </Link>
              <Link
                href="/collections/all"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#1b4332]"
              >
                All Products
              </Link>
              <Link
                href="/pages/about-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#1b4332]"
              >
                Our Story & Heritage
              </Link>
              <Link
                href="/pages/lab-test-reports"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#1b4332]"
              >
                Lab Test Reports
              </Link>
              <Link
                href="/pages/hampers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#1b4332]"
              >
                Festive Hampers
              </Link>
              <Link
                href="/pages/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#1b4332]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
