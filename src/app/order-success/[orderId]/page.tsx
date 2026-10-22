import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import type { Metadata } from 'next';

interface OrderSuccessProps {
  params: Promise<{ orderId: string }>;
}

export const metadata: Metadata = {
  title: 'Order Confirmed | Rosier Foods',
  description: 'Thank you for your Rosier Foods order.',
};

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const { orderId } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="rounded-3xl bg-white border border-stone-200 p-8 sm:p-12 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1b4332] uppercase">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Thank You for Choosing Rosier Foods!
          </h1>
          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            Your journey toward pure, ancestral nutrition has begun. We are carefully packing your items directly from our farm facility.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-stone-200 text-left space-y-4 max-w-md mx-auto">
          <div className="flex justify-between items-center pb-3 border-b border-stone-200 text-xs">
            <span className="text-stone-500">Order Reference:</span>
            <span className="font-mono font-bold text-stone-900 text-sm">#{orderId}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-stone-200 text-xs">
            <span className="text-stone-500">Status:</span>
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Processing &amp; Packing
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500">Estimated Delivery:</span>
            <span className="font-semibold text-stone-800">2 - 4 Business Days</span>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-stone-600">
          <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2">
            <Package className="w-4 h-4 text-[#1b4332] flex-shrink-0" />
            <span>1. Fresh Farm Packing</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#1b4332] flex-shrink-0" />
            <span>2. Express Dispatch</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1b4332] flex-shrink-0" />
            <span>3. Doorstep Delivery</span>
          </div>
        </div>

        {/* Contact support */}
        <div className="text-xs text-stone-500 pt-4 border-t border-stone-100 flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 text-[#1b4332]" />
          <span>Need help? WhatsApp customer care at <strong>+91 99999 87654</strong></span>
        </div>

        <div className="pt-2">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider hover:bg-[#123124] transition-colors shadow-md"
          >
            <span>Explore More Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
