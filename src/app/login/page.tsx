'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#1b4332] text-[#f7e6c4] flex items-center justify-center font-serif text-xl font-bold mx-auto shadow-sm">
          R
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Sign In to Rosier Foods
        </h1>
        <p className="text-xs text-stone-500">
          Access your orders, saved addresses, and member benefits
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="care@rosierfoods.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-[11px] text-[#1b4332] hover:underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-[#fbf9f5] border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/account" className="font-bold text-[#1b4332] hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
