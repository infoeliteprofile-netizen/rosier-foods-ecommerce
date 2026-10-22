import React from 'react';
import Link from 'next/link';
import { LAB_REPORTS } from '@/data/rosier-data';
import { ShieldCheck, FileText, CheckCircle2, Award, Download, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab Test Reports & Purity Certificates | Rosier Foods',
  description:
    'Download and view official NABL accredited laboratory test reports for Rosier Foods A2 Ghee, Honey, Atta, and Cold-Pressed Oils.',
};

export default function LabTestReportsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Radical Transparency</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Laboratory Test Reports &amp; Certificates
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          At Rosier Foods, quality is not a marketing promise—it is an empirically verified fact. We routinely publish independent third-party test reports conducted by NABL accredited food laboratories across India.
        </p>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center">
        <div>
          <span className="block font-serif text-2xl font-bold text-[#1b4332]">100%</span>
          <span className="text-xs text-stone-500 font-medium">A2 Beta-Casein DNA Tested</span>
        </div>
        <div>
          <span className="block font-serif text-2xl font-bold text-[#1b4332]">NMR</span>
          <span className="text-xs text-stone-500 font-medium">Nuclear Magnetic Resonance Honey</span>
        </div>
        <div>
          <span className="block font-serif text-2xl font-bold text-[#1b4332]">Zero</span>
          <span className="text-xs text-stone-500 font-medium">Mineral Oil or Adulterants</span>
        </div>
        <div>
          <span className="block font-serif text-2xl font-bold text-[#1b4332]">FSSAI</span>
          <span className="text-xs text-stone-500 font-medium">License: 10821005000492</span>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Official Batch Inspection Reports
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_REPORTS.map((report, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b4332] uppercase tracking-wider">
                    {report.product}
                  </span>
                  <span className="font-mono text-stone-400 font-medium">{report.date}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {report.title}
                </h3>

                <p className="text-xs text-stone-500 font-medium">
                  Laboratory: <strong className="text-stone-800">{report.lab}</strong>
                </p>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Result: {report.result}
                  </span>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">{report.summary}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                <span className="text-stone-500 font-mono text-[11px]">Cert: {report.certNumber}</span>
                <span className="text-xs font-bold text-[#1b4332] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Verified Document
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification instructions */}
      <div className="p-8 rounded-3xl bg-[#fbf9f5] border border-amber-200/80 space-y-4">
        <h3 className="font-serif text-xl font-bold text-stone-900">
          How to verify your individual jar batch
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Each jar of Rosier Foods A2 Ghee and cold-pressed oil carries a stamped batch number on the neck label (e.g., RF-GHEE-2026-B14). You can WhatsApp our customer care team anytime with your batch number to receive the full signed PDF certificate corresponding to your exact lot.
        </p>
        <div className="pt-2">
          <Link
            href="/pages/contact"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1b4332] hover:underline uppercase tracking-wider"
          >
            <span>Request Specific Batch Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
