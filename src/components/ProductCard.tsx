'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductItem, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { Star, Check, Plus, Minus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: `${product.id}-default`,
      title: 'Standard',
      price: product.price,
      compareAtPrice: product.compareAtPrice,
    }
  );
  const [isHovered, setIsHovered] = useState(false);

  // Check if item currently in cart
  const cartItemId = `${product.slug}-${selectedVariant.title.replace(/\s+/g, '-').toLowerCase()}`;
  const existingCartItem = items.find((i) => i.id === cartItemId);

  const discountPercentage = selectedVariant.compareAtPrice
    ? Math.round(
        ((selectedVariant.compareAtPrice - selectedVariant.price) /
          selectedVariant.compareAtPrice) *
          100
      )
    : 0;

  const displayImage =
    isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0] || 'https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800';

  return (
    <div
      className="group flex flex-col bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-amber-700/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#fbf9f5] overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[#1b4332] text-[#f7e6c4] shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#d4a373] text-stone-900 shadow-sm">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-[#1b4332] hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Link>

        {/* Image */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Card Info Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Rating and category */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
            {product.categoryName}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-stone-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-stone-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          href={`/products/${product.slug}`}
          className="font-medium text-stone-900 text-base leading-snug hover:text-[#1b4332] transition-colors line-clamp-2 min-h-[2.75rem]"
        >
          {product.name}
        </Link>

        {/* Tagline */}
        <p className="text-xs text-stone-500 line-clamp-1 mt-1 mb-3">
          {product.tagline}
        </p>

        {/* Variant Pills Selector */}
        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedVariant.id === v.id
                    ? 'bg-[#1b4332] text-white shadow-sm ring-1 ring-[#1b4332]'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2 border-t border-stone-100">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-stone-900">
              ₹{selectedVariant.price.toFixed(2)}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹{selectedVariant.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action button */}
          {existingCartItem ? (
            <div className="flex items-center justify-between bg-stone-100 rounded-xl p-1 border border-stone-300">
              <button
                type="button"
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-sm"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-stone-900 text-sm">
                {existingCartItem.quantity} in Cart
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, selectedVariant, 1)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#143225] font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 group-hover:scale-[1.01]"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
