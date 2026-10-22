import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Shipping Policy | Rosier Foods',
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 border-b border-stone-200 pb-4">
        Shipping Policy
      </h1>

      <div className="prose prose-stone text-sm leading-relaxed space-y-6 text-stone-700">
        <h3 className="font-serif text-lg font-bold text-stone-900">1. Free Shipping Threshold</h3>
        <p>
          We offer <strong>FREE Standard Delivery</strong> on all orders within India with a total value equal to or exceeding <strong>₹499</strong>. For orders below ₹499, a nominal flat shipping fee of <strong>₹50</strong> applies.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">2. Processing &amp; Dispatch Timeline</h3>
        <p>
          To maintain utmost freshness, our flours are milled in small batches and our ghee is fresh-poured. Orders placed before 1:00 PM IST are processed and dispatched within <strong>24 to 48 hours</strong> (excluding Sundays and national holidays).
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">3. Estimated Delivery Times</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Delhi NCR &amp; North India:</strong> 1 - 3 business days</li>
          <li><strong>Metropolitan Cities (Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad):</strong> 2 - 4 business days</li>
          <li><strong>Rest of India:</strong> 3 - 6 business days</li>
        </ul>

        <h3 className="font-serif text-lg font-bold text-stone-900">4. Order Tracking</h3>
        <p>
          Once your package is handed over to our courier partners (Bluedart, Delhivery, DTDC), an automated SMS and WhatsApp notification with your live tracking AWB link will be dispatched to your registered phone number.
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
