'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1b4332]">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Get in Touch with Rosier Foods
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Have queries regarding Vedic Bilona Ghee, lab test reports, or your orders? Our team is delighted to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-[#1b4332] text-white rounded-3xl p-8 sm:p-10 space-y-8 shadow-xl border border-[#2d5a45]">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#f7e6c4] mb-2">
              Customer Support &amp; Care
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              We respond promptly to all questions, bulk corporate inquiries, and product questions.
            </p>
          </div>

          <div className="space-y-6 text-sm text-stone-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2a5944] flex items-center justify-center flex-shrink-0 text-[#d4a373]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-[#f7e6c4] text-xs uppercase tracking-wider mb-0.5">
                  Head Office &amp; Pantry
                </span>
                <span className="text-xs leading-relaxed text-stone-300">
                  Rosier Foods Pvt. Ltd., Sector 48, Sohna Road, Gurugram, Haryana - 122018, India
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2a5944] flex items-center justify-center flex-shrink-0 text-[#d4a373]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-[#f7e6c4] text-xs uppercase tracking-wider mb-0.5">
                  Phone &amp; WhatsApp Support
                </span>
                <span className="text-xs text-stone-300">+91 99999 87654</span>
                <span className="block text-[11px] text-stone-400 mt-0.5">WhatsApp available 24/7</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2a5944] flex items-center justify-center flex-shrink-0 text-[#d4a373]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-[#f7e6c4] text-xs uppercase tracking-wider mb-0.5">
                  Email
                </span>
                <span className="text-xs text-stone-300">care@rosierfoods.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2a5944] flex items-center justify-center flex-shrink-0 text-[#d4a373]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-[#f7e6c4] text-xs uppercase tracking-wider mb-0.5">
                  Support Hours
                </span>
                <span className="text-xs text-stone-300">Monday &ndash; Saturday, 9:00 AM &ndash; 7:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Inquiry Received!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Thank you for contacting Rosier Foods. Our care executive will review your inquiry and connect with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-xl bg-[#1b4332] text-[#f7e6c4] text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile number"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Order query, Lab report, Bulk inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
