'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, Tag, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'coupons'>('orders');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-[#1b4332] text-white border border-[#2d5a45] shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f7e6c4] text-[#1b4332] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            R
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#d4a373] uppercase">
              Rosier Family Member
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7e6c4]">
              Welcome Back
            </h1>
            <p className="text-xs text-stone-300">care@rosierfoods.com</p>
          </div>
        </div>

        <Link
          href="/collections/all"
          className="px-5 py-2.5 rounded-xl bg-[#d4a373] text-stone-950 hover:bg-[#c39162] text-xs font-bold uppercase tracking-wider transition-colors text-center shadow-sm"
        >
          Shop Now
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#1b4332] text-[#1b4332]'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#1b4332] text-[#1b4332]'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile &amp; Address</span>
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'coupons'
              ? 'border-[#1b4332] text-[#1b4332]'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Available Coupons</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-stone-900 text-sm">#RF-892147</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-stone-500">
                A2 Ghee - Hand Churned Gir Cow Bilona Ghee (1 Ltr), Khapli Atta (2 Kg)
              </p>
              <p className="text-xs text-stone-400">Placed on 14 Oct 2026 • Paid via UPI</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-stone-900 text-sm block">₹2,398.20</span>
              <span className="text-xs text-[#1b4332] font-semibold hover:underline cursor-pointer">
                View Receipt
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-stone-900 text-sm">#RF-773410</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Stone Pressed Black Mustard Oil (1 Ltr), Mango Pickle - Natural Sun Dried (300g)
              </p>
              <p className="text-xs text-stone-400">Placed on 28 Sep 2026 • Paid via COD</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-stone-900 text-sm block">₹591.20</span>
              <span className="text-xs text-[#1b4332] font-semibold hover:underline cursor-pointer">
                View Receipt
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6 max-w-xl">
          <h3 className="font-serif text-lg font-bold text-stone-900">Personal Details</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-500 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Rosier Family Member"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#fbf9f5] font-semibold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="care@rosierfoods.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#fbf9f5] font-semibold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Default Delivery Address</label>
              <textarea
                rows={2}
                defaultValue="Sector 48, Sohna Road, Gurugram, Haryana - 122018"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#fbf9f5] font-semibold text-stone-900"
              />
            </div>
          </div>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123124]"
          >
            Save Changes
          </button>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#1b4332] text-base bg-amber-100 px-2 py-0.5 rounded">
                ROSIER10
              </span>
              <span className="text-xs font-bold text-emerald-800">10% OFF</span>
            </div>
            <p className="text-xs text-stone-600">
              Valid on all orders above ₹499. Apply during checkout.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#1b4332] text-base bg-amber-100 px-2 py-0.5 rounded">
                WELCOME15
              </span>
              <span className="text-xs font-bold text-emerald-800">15% OFF</span>
            </div>
            <p className="text-xs text-stone-600">
              Welcome gift coupon for new members on first Vedic pantry purchase.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
