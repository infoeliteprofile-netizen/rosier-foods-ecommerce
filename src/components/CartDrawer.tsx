'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    progressToFreeShipping,
    amountNeededForFreeShipping,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyCoupon(inputCode);
    setCouponFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const finalTotal = Math.max(0, subtotal - discount + (amountNeededForFreeShipping === 0 ? 0 : 50));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#fbf9f5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1b4332]" />
              <h2 className="text-lg font-bold text-stone-900">Your Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-semibold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-amber-50/70 p-3.5 border-b border-amber-200/50">
            <div className="text-xs text-stone-800 font-medium mb-1.5 flex items-center justify-between">
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-[#1b4332] font-semibold flex items-center gap-1">
                  🎉 Congratulations! You unlocked <strong>FREE Standard Delivery</strong>
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#1b4332]">₹{amountNeededForFreeShipping}</strong> more for{' '}
                  <strong>FREE Delivery</strong>
                </span>
              )}
              <span className="text-[10px] text-stone-500 font-bold">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1b4332] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#fbf9f5] flex items-center justify-center text-stone-400 border border-stone-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Discover pure Vedic Bilona Ghee, ancient stoneground flours, and cold-pressed oils.
                  </p>
                </div>
                <Link
                  href="/collections/all"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#143225] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-3.5">
                  <div
                    style={{ position: 'relative', width: '5rem', height: '5rem', flexShrink: 0 }}
                    className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden border border-stone-200"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.productSlug}`}
                          onClick={closeCart}
                          className="font-medium text-stone-900 text-sm hover:text-[#1b4332] line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 font-medium mt-0.5">
                        Size: {item.variantTitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-stone-900 text-sm">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.compareAtPrice && (
                          <span className="block text-[11px] text-stone-400 line-through">
                            ₹{(item.compareAtPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Totals & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#fbf9f5] space-y-4">
              {/* Coupon input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" /> Coupon &ldquo;{couponCode}&rdquo; applied!
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-stone-800 underline font-medium text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Coupon code (e.g. ROSIER10)"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1b4332] uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 text-white hover:bg-stone-900 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !couponCode && (
                  <p
                    className={`text-[11px] mt-1 font-medium ${
                      couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-700 uppercase font-bold">FREE</span>
                    ) : (
                      '₹50.00'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-[#1b4332]">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Secure Checkout &amp; Vedic Purity Guaranteed</span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#143225] font-bold text-sm tracking-wider uppercase transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block text-center py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                >
                  View Full Cart Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
