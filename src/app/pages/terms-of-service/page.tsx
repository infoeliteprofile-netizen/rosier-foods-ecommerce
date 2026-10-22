import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Rosier Foods',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 border-b border-stone-200 pb-4">
        Terms of Service
      </h1>

      <div className="prose prose-stone text-sm leading-relaxed space-y-6 text-stone-700">
        <p>
          By accessing or purchasing from <strong>Rosier Foods</strong> (rosierfoods.com), you agree to be bound by the following terms and conditions.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">1. Product Information &amp; Natural Variations</h3>
        <p>
          Because our products are crafted without artificial stabilizers, homogenizers, or chemical bleaching agents, minor natural variations in color, aroma, and granularity (danedar texture) may occur from batch to batch according to season, cow grazing diet, and weather conditions.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">2. Pricing &amp; Availability</h3>
        <p>
          All product prices are quoted in Indian Rupees (INR) and are inclusive of applicable GST taxes. We reserve the right to revise prices or discontinue products based on seasonal harvest yields without prior notice.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">3. FSSAI &amp; Regulatory Compliance</h3>
        <p>
          All Rosier Foods products comply with the standards set forth by the Food Safety and Standards Authority of India (FSSAI license: 10821005000492).
        </p>
      </div>

      <div className="pt-6 border-t border-stone-200">
        <Link href="/" className="text-xs font-bold text-[#1b4332] hover:underline uppercase tracking-wider">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}
