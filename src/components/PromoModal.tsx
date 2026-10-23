'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, Check, ArrowRight, Tag } from 'lucide-react';

export interface PromoPopupConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  couponCode: string;
  imageUrl: string;
  buttonText: string;
  targetUrl: string;
  delaySeconds: number;
  frequency: 'every_visit' | 'once_per_session' | 'once_daily';
}

export const DEFAULT_PROMO_CONFIG: PromoPopupConfig = {
  enabled: true,
  title: 'Pure Vedic Harvest Offer! 🌾',
  subtitle: 'Get 10% OFF on Certified A2 Bilona Ghee, Raw Honey & Stoneground Atta',
  couponCode: 'ROSIER10',
  imageUrl: 'https://www.rosierfoods.com/cdn/shop/files/diwali-hamper.png?v=1791490455&width=800',
  buttonText: 'Claim 10% OFF & Shop Now',
  targetUrl: '/collections/all',
  delaySeconds: 4,
  frequency: 'once_per_session',
};

export default function PromoModal() {
  const [config, setConfig] = useState<PromoPopupConfig>(DEFAULT_PROMO_CONFIG);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Load config from localStorage or API
    let activeConfig = DEFAULT_PROMO_CONFIG;
    try {
      const stored = localStorage.getItem('rosier_promo_popup');
      if (stored) {
        activeConfig = { ...DEFAULT_PROMO_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Could not read promo popup config from localStorage', e);
    }
    setConfig(activeConfig);

    if (!activeConfig.enabled) return;

    // 2. Frequency check
    if (activeConfig.frequency === 'once_per_session') {
      const seen = sessionStorage.getItem('rosier_promo_dismissed');
      if (seen === 'true') return;
    } else if (activeConfig.frequency === 'once_daily') {
      const lastShown = localStorage.getItem('rosier_promo_last_shown');
      if (lastShown) {
        const diffHours = (Date.now() - parseInt(lastShown, 10)) / (1000 * 60 * 60);
        if (diffHours < 24) return;
      }
    }

    // 3. Set delay timer based on admin configured delay
    const delayMs = Math.max(1, activeConfig.delaySeconds || 4) * 1000;
    const timer = setTimeout(() => {
      setIsOpen(true);
      if (activeConfig.frequency === 'once_daily') {
        localStorage.setItem('rosier_promo_last_shown', Date.now().toString());
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('rosier_promo_dismissed', 'true');
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!config.couponCode) return;
    navigator.clipboard.writeText(config.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen || !config.enabled) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div
        className="relative w-full max-w-lg bg-[#fbf9f5] dark:bg-[#142019] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/80 dark:border-stone-700 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close promotional popup"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-md text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-105"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Promo Image Header */}
        {config.imageUrl && (
          <div className="relative w-full aspect-[2/1] sm:aspect-[2.2/1] bg-amber-50 dark:bg-stone-800 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={config.imageUrl}
              alt={config.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-[#f7e6c4] text-[11px] font-bold tracking-wider uppercase shadow-md">
              <Sparkles className="w-3 h-3 text-[#d4a373]" />
              <span>Limited Time Deal</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-4 text-center">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b4332] dark:text-[#f7e6c4] leading-snug">
              {config.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1.5 max-w-md mx-auto leading-relaxed">
              {config.subtitle}
            </p>
          </div>

          {/* Coupon Box */}
          {config.couponCode && (
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto p-2 bg-white dark:bg-stone-800 rounded-xl border border-dashed border-amber-300 dark:border-stone-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium pl-1">
                <Tag className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Code:</span>
              </div>
              <span className="font-mono text-sm font-bold tracking-wider text-[#1b4332] dark:text-[#d4a373]">
                {config.couponCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-auto px-2.5 py-1 rounded-lg bg-[#1b4332] hover:bg-[#143225] text-[#f7e6c4] text-[11px] font-bold transition-all flex items-center gap-1"
                title="Copy Coupon Code"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeWidth="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" strokeWidth="2"/>
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href={config.targetUrl || '/collections/all'}
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#143225] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>{config.buttonText || 'Shop Offer Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white font-medium py-1 sm:py-0"
            >
              No thanks, maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
