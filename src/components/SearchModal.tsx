'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/rosier-data';
import { ProductItem } from '@/types';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const popularTags = ['A2 Ghee', 'Khapli Atta', 'Mustard Oil', 'Chyawanprash', 'Gond Laddoo', 'Raw Honey', 'Mango Pickle'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-16">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Search Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-200 bg-[#fbf9f5]">
            <Search className="w-5 h-5 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pure A2 Ghee, stoneground atta, oils, pickles..."
              className="flex-1 bg-transparent border-none text-stone-900 placeholder-stone-400 focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-stone-400 hover:text-stone-600 text-xs font-semibold px-2 py-1 bg-stone-200 rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tags when empty */}
          {!query && (
            <div className="p-6">
              <p className="text-xs font-semibold tracking-wider uppercase text-stone-400 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-[#f4ece1] hover:bg-[#e8dbca] text-xs font-medium text-stone-800 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-stone-100">
              {results.length > 0 ? (
                results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 py-3 px-3 hover:bg-[#fbf9f5] rounded-xl transition-colors group"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 flex-1"
                    >
                      <div className="relative w-16 h-16 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                          {product.categoryName}
                        </span>
                        <h4 className="font-medium text-stone-900 truncate text-sm">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-[#1b4332] text-sm">
                            ₹{product.price.toFixed(2)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              ₹{product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                          <div className="flex items-center text-xs text-amber-600 ml-2">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-0.5" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        addToCart(product);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1b4332] text-[#f7e6c4] hover:bg-[#143225] transition-colors whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-stone-500">
                  <p className="text-base font-medium">No foods found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-stone-400 mt-1">Try searching for Ghee, Atta, Mustard Oil, or Honey</p>
                </div>
              )}
            </div>
          )}

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#fbf9f5] border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Press ESC to close</span>
            <Link
              href="/collections/all"
              onClick={onClose}
              className="font-medium text-[#1b4332] hover:underline flex items-center gap-1"
            >
              Browse all collections <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
