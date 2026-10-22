import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund & Return Policy | Rosier Foods',
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 border-b border-stone-200 pb-4">
        Refund &amp; Return Policy
      </h1>

      <div className="prose prose-stone text-sm leading-relaxed space-y-6 text-stone-700">
        <p>
          At <strong>Rosier Foods</strong>, your satisfaction and health are our highest priorities. Because our products are perishable food items (Vedic Ghee, Stoneground Atta, Raw Honey, Stone-Pressed Oils, and Pickles), we follow stringent hygiene and safety protocols.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">1. Damaged or Tampered Shipments</h3>
        <p>
          If your shipment arrives with broken glass jars, damaged seals, or leaks incurred during transit, please notify our team within <strong>48 hours</strong> of receipt by sending photos of the damaged package and your order number to <code>care@rosierfoods.com</code> or WhatsApp at <code>+91 99999 87654</code>. We will arrange a free immediate replacement or issue a 100% refund without hesitation.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">2. Quality Concerns</h3>
        <p>
          If you perceive any genuine anomaly in texture, aroma, or quality, our food science team will review your batch lot number. Upon validation, we will offer a replacement or store credit.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">3. Non-Returnable Items</h3>
        <p>
          Opened food packages cannot be returned for hygienic reasons unless a manufacturing defect is verified.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">4. Refund Processing Time</h3>
        <p>
          Approved refunds are processed back to the original payment source (UPI / Card / NetBanking) within <strong>5 to 7 business days</strong>. For Cash on Delivery orders, refunds will be credited via direct bank transfer or UPI ID provided by the customer.
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
