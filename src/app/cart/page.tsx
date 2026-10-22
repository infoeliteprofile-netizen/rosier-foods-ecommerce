'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
    progressToFreeShipping,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) setInputCoupon('');
  };

  const shippingCost = amountNeededForFreeShipping === 0 ? 0 : 50;
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#fbf9f5] border border-stone-200 flex items-center justify-center text-stone-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Your Shopping Cart is Empty</h1>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          Explore pure Vedic A2 Desi Ghee, ancient stoneground Khapli Atta, and cold-pressed oils.
        </p>
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider hover:bg-[#123124] transition-colors shadow-md"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Your Shopping Bag</h1>
          <p className="text-xs text-stone-500 mt-1">Review your items before proceeding to checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-stone-500 hover:text-red-600 underline"
        >
          Clear Cart
        </button>
      </div>

      {/* Free Shipping Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
          {amountNeededForFreeShipping === 0 ? (
            <span className="text-[#1b4332] font-bold">
              🎉 You unlocked FREE Standard Delivery!
            </span>
          ) : (
            <span>
              Add <strong className="text-[#1b4332]">₹{amountNeededForFreeShipping}</strong> more to get{' '}
              <strong>FREE Shipping</strong>!
            </span>
          )}
          <span>{progressToFreeShipping}%</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1b4332] transition-all duration-500 rounded-full"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm divide-y divide-stone-100">
          {items.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#fbf9f5] border border-stone-200 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="font-bold text-stone-900 text-sm sm:text-base hover:text-[#1b4332] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-stone-500 font-medium">Variant: {item.variantTitle}</p>
                  <p className="font-semibold text-stone-900 text-sm sm:hidden">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="font-bold text-stone-900 text-base">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-[#fbf9f5] flex items-center justify-between text-xs text-stone-600">
            <Link href="/collections/all" className="inline-flex items-center gap-1.5 font-semibold text-[#1b4332] hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Order Summary
          </h3>

          {/* Coupon Code Input */}
          <div className="space-y-2">
            {couponCode ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  Coupon &ldquo;{couponCode}&rdquo; active
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-stone-500 hover:text-stone-800 underline font-semibold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Promo code (ROSIER10)"
                  className="flex-1 px-3.5 py-2.5 text-xs bg-[#fbf9f5] border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1b4332] uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponFeedback && !couponCode && (
              <p
                className={`text-[11px] font-medium ${
                  couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                {couponFeedback.message}
              </p>
            )}
          </div>

          {/* Subtotal breakdown */}
          <div className="space-y-3 text-sm text-stone-600 border-t border-stone-100 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount</span>
                <span className="font-semibold">-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-stone-900">
                {shippingCost === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase">FREE</span>
                ) : (
                  `₹${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-stone-900 border-t border-stone-200 pt-3">
              <span>Total</span>
              <span className="text-[#1b4332]">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 px-6 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Guaranteed Safe &amp; Secure Indian Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
