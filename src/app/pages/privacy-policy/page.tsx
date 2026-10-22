import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Rosier Foods',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 border-b border-stone-200 pb-4">
        Privacy Policy
      </h1>

      <div className="prose prose-stone text-sm leading-relaxed space-y-6 text-stone-700">
        <p>
          Rosier Foods Private Limited respects your personal privacy. We collect only information necessary to process orders, fulfill shipments, and provide personalized customer care.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">1. Information We Collect</h3>
        <p>
          When you place an order or create an account, we collect your name, shipping address, contact phone number, and email. We do NOT store complete credit card or debit card numbers—all financial transactions are routed directly through PCI-DSS compliant secure payment gateways.
        </p>

        <h3 className="font-serif text-lg font-bold text-stone-900">2. How We Use Your Information</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Fulfill orders and deliver packages to your physical address.</li>
          <li>Communicate order status, tracking links, and customer care responses.</li>
          <li>Send occasional newsletters and seasonal discount promotions (you may unsubscribe at any time).</li>
        </ul>

        <h3 className="font-serif text-lg font-bold text-stone-900">3. Data Security</h3>
        <p>
          We employ 256-bit SSL encryption, database firewalls, and strict internal access control to protect your personal details from unauthorized access.
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
