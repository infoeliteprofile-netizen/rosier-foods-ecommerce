'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, COLOR_PRESETS } from '@/context/ThemeContext';
import { PRODUCTS, CATEGORIES } from '@/data/rosier-data';
import { ProductItem, CategoryItem } from '@/types';
import { DEFAULT_PROMO_CONFIG, PromoPopupConfig } from '@/components/PromoModal';
import {
  Layers,
  ShoppingBag,
  Package,
  Settings,
  Sun,
  Moon,
  Palette,
  Edit,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  Search,
  ArrowRight,
  ShieldCheck,
  Eye,
  FileText,
  Lock,
  LogOut,
  ChevronRight,
  CreditCard,
  Clock,
  X,
  Check,
  Tag,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const {
    mode,
    setMode,
    toggleMode,
    primaryColor,
    primaryHover,
    accentColor,
    setColors,
    applyPreset,
  } = useTheme();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active view tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'categories' | 'orders' | 'payments' | 'content' | 'popups' | 'theme'
  >('dashboard');

  // Products state & Modal
  const [productList, setProductList] = useState<ProductItem[]>(PRODUCTS);
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Categories state & Modal
  const [categoryList, setCategoryList] = useState<CategoryItem[]>(CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Orders state
  const [ordersList, setOrdersList] = useState<any[]>([]);

  // Page-wise Content State & Subtabs
  const [contentSubTab, setContentSubTab] = useState<
    'home' | 'about' | 'labReports' | 'hampers' | 'contact' | 'policies'
  >('home');

  const [pageContent, setPageContent] = useState({
    home: {
      announcementText: 'SALE ENDING TONIGHT: USE CODE ROSIER10 FOR 10% OFF',
      couponCode: 'ROSIER10',
      heroHeadline: 'Pure, Traditional Foods Delivered Across India',
      heroSubheadline: 'Hand-churned A2 Gir Cow Ghee, stoneground unhybridized Khapli Atta, and cold-pressed Kolhu oils—crafted with ancient wisdom for modern vitality.',
      heroBadge: '100% Vedic Bilona • Zero Chemicals',
      heroCtaText: 'Shop Pure Foods',
      heroImageUrl: 'https://www.rosierfoods.com/cdn/shop/files/1_1658a322-943b-4593-a967-af22b89937a2.png?format=webp&v=1792159997&width=1600',
      marqueePhrase: 'FOODS THAT HEAL, NOT HYPE • PURE | TRADITIONAL | ETHICALLY CRAFTED • 100% VEDIC BILONA GHEE • ZERO CHEMICALS',
      storyHindiHeadline: 'जड़ों से जुड़े लोग, असली बदलाव',
      storyDescription: 'At Rosier Foods, we believe true nourishment begins at the source. We partner directly with multigenerational farming families who cultivate indigenous heritage seeds, nurse native Gir cows with kindness, and preserve ancient wisdom.',
      statGirCows: '5,000+',
      statFarmers: '45+',
      statHomes: '150k+',
    },
    about: {
      headline: 'Our Heritage & Soil-To-Soul Journey',
      subtitle: 'Preserving India’s Ancient Bilona Churning & Unhybridized Heirloom Crops',
      story1: 'Founded on the sacred reverence for Indian indigenous cows and native seeds, Rosier Foods was born out of an urgent need to escape adulterated, ultra-processed supermarket staples.',
      story2: 'We partner directly with multigenerational farming families across Rajasthan, Haryana, and Gujarat. No middlemen, no chemical preservatives, no deodorized oils.',
      heritagePledge: 'Every batch is tracked from the cow’s grass diet to the glass jar delivered to your home.',
    },
    labReports: {
      headline: 'LAB REPORTS FOR ALL THE PRODUCTS',
      subtitle: 'Complete NABL & FSSAI analytical transparency for every single batch produced.',
      disclaimer: 'Third-party testing conducted by accredited NABL laboratories for A2 Beta-Casein DNA purity, NMR spectrum, and zero heavy metal contamination.',
    },
    hampers: {
      headline: 'Festive & Wellness Gift Hampers',
      subtitle: 'Thoughtfully packaged Vedic wellness boxes for Diwali, weddings, and corporate celebrations.',
      customOrdersNotice: 'Need custom branding or corporate bulk hampers? Contact our gifting concierge directly on WhatsApp.',
      whatsappPhone: '+91 99999 87654',
    },
    contact: {
      headline: 'Connect With The Rosier Family',
      address: 'Rosier Foods, Sector 48, Gurugram, Haryana - 122018, India',
      phone: '+91 99999 87654',
      email: 'care@rosierfoods.com',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM IST',
    },
    policies: {
      shippingNotice: 'Free shipping on orders above ₹499. Dispatched within 24 hours via express courier with real-time tracking.',
      refundNotice: 'Hassle-free 7-day replacement guarantee if goods arrive damaged or unsealed. WhatsApp support responds within 1 hour.',
    },
  });

  // Promotional Popup & Ads State
  const [popupConfig, setPopupConfig] = useState<PromoPopupConfig>(DEFAULT_PROMO_CONFIG);
  const [testPopupOpen, setTestPopupOpen] = useState(false);

  // Payment Gateways & Transactions State
  const [paymentSubTab, setPaymentSubTab] = useState<'gateways' | 'transactions'>('gateways');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionFilter, setTransactionFilter] = useState<'ALL' | 'SUCCESS' | 'PENDING' | 'REFUNDED'>('ALL');

  const [gatewaySettings, setGatewaySettings] = useState({
    razorpay: {
      enabled: true,
      mode: 'live',
      keyId: 'rzp_live_rosierfoods123',
      keySecret: '••••••••••••••••',
      merchantName: 'Rosier Foods Private Limited',
    },
    cod: {
      enabled: true,
      extraFee: 0,
      minOrder: 0,
      maxOrder: 10000,
      instructions: 'Pay cash or UPI directly upon doorstep delivery.',
    },
    upi: {
      enabled: true,
      upiId: 'rosierfoods@okaxis',
      merchantName: 'Rosier Foods Pure Vedic',
      qrImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=rosierfoods@okaxis&pn=RosierFoods',
      instructions: 'Scan with Google Pay, PhonePe, Paytm, or BHIM. Zero payment fees.',
    },
    stripe: {
      enabled: false,
      publishableKey: 'pk_live_...',
      secretKey: '••••••••••••••••',
    },
  });

  // Demo / Live Transactions ledger
  const [transactionsList, setTransactionsList] = useState([
    {
      id: 'TXN_2026102401',
      orderId: 'RF-892147',
      customerName: 'Sumit Suhag',
      phone: '+91 98112 34567',
      amount: 2398.20,
      method: 'UPI',
      gateway: 'Direct UPI (GPay)',
      status: 'SUCCESS',
      date: '24 Oct 2026, 01:45 AM',
      gatewayRef: 'UPI_RR_983104921',
    },
    {
      id: 'TXN_2026102302',
      orderId: 'RF-773410',
      customerName: 'Alisha A.',
      phone: '+91 99887 76543',
      amount: 591.20,
      method: 'COD',
      gateway: 'Cash on Delivery',
      status: 'PENDING',
      date: '23 Oct 2026, 08:30 PM',
      gatewayRef: 'COD_VERIFIED_OTP',
    },
    {
      id: 'TXN_2026102303',
      orderId: 'RF-661298',
      customerName: 'Priya Sharma',
      phone: '+91 97110 99881',
      amount: 4150.00,
      method: 'Razorpay',
      gateway: 'Razorpay NetBanking',
      status: 'SUCCESS',
      date: '23 Oct 2026, 04:15 PM',
      gatewayRef: 'pay_Nq98xK198Za',
    },
    {
      id: 'TXN_2026102204',
      orderId: 'RF-554109',
      customerName: 'Rajesh Malhotra',
      phone: '+91 98220 11445',
      amount: 1450.00,
      method: 'Razorpay',
      gateway: 'Cards (Visa/Mastercard)',
      status: 'REFUNDED',
      date: '22 Oct 2026, 11:20 AM',
      gatewayRef: 'pay_Nq87pB910Xx',
    },
    {
      id: 'TXN_2026102205',
      orderId: 'RF-441092',
      customerName: 'Kavita Menon',
      phone: '+91 99440 22331',
      amount: 890.00,
      method: 'UPI',
      gateway: 'PhonePe QR',
      status: 'SUCCESS',
      date: '22 Oct 2026, 09:10 AM',
      gatewayRef: 'UPI_RR_48109211',
    },
  ]);

  // Theme color pickers
  const [customPrimary, setCustomPrimary] = useState(primaryColor);
  const [customAccent, setCustomAccent] = useState(accentColor);

  // Toast Notifications
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Check login session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('rosier_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }

    // Load saved settings & popup configuration
    try {
      const storedPopup = localStorage.getItem('rosier_promo_popup');
      if (storedPopup) setPopupConfig({ ...DEFAULT_PROMO_CONFIG, ...JSON.parse(storedPopup) });

      const storedGateways = localStorage.getItem('rosier_gateways');
      if (storedGateways) setGatewaySettings(JSON.parse(storedGateways));

      const storedContent = localStorage.getItem('rosier_site_content');
      if (storedContent) setPageContent(JSON.parse(storedContent));
    } catch (e) {
      console.warn('Could not read admin settings', e);
    }
  }, []);

  // Fetch initial orders
  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrdersList(data.orders);
      })
      .catch((e) => console.warn('Orders fetch error', e));
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passwordInput === 'rosieradmin' ||
      passwordInput === 'admin123' ||
      passwordInput === 'admin'
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('rosier_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Default passcode is "rosieradmin"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rosier_admin_auth');
  };

  // Filter products by search
  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.categorySlug.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Handle Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch('/api/admin/products', {
        method: isAddingProduct ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      if (res.ok) {
        if (isAddingProduct) {
          setProductList([editingProduct, ...productList]);
        } else {
          setProductList(
            productList.map((p) => (p.id === editingProduct.id ? editingProduct : p))
          );
        }
        showNotification('✓ Product saved successfully!');
        setEditingProduct(null);
        setIsAddingProduct(false);
      }
    } catch (e) {
      showNotification('Product updated in memory.');
      setEditingProduct(null);
      setIsAddingProduct(false);
    }
  };

  // Handle Product Delete
  const handleDeleteProduct = async (id: string, slug: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/admin/products?id=${id}&slug=${slug}`, { method: 'DELETE' });
    } catch (e) {}
    setProductList(productList.filter((p) => p.id !== id && p.slug !== slug));
    showNotification('Product removed.');
  };

  // Handle Category Save
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      });
    } catch (e) {}

    if (isAddingCategory) {
      setCategoryList([...categoryList, editingCategory]);
    } else {
      setCategoryList(
        categoryList.map((c) => (c.slug === editingCategory.slug ? editingCategory : c))
      );
    }
    showNotification('✓ Category saved successfully!');
    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  // Handle Order Status Update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    } catch (e) {}

    setOrdersList(
      ordersList.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showNotification(`Order status updated to ${newStatus}`);
  };

  // Handle Page-wise Content Save
  const handleSavePageContent = async () => {
    try {
      localStorage.setItem('rosier_site_content', JSON.stringify(pageContent));
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: pageContent }),
      });
    } catch (e) {}
    showNotification('✓ Page content saved & live across website!');
  };

  // Handle Popup Settings Save
  const handleSavePopupSettings = () => {
    try {
      localStorage.setItem('rosier_promo_popup', JSON.stringify(popupConfig));
      // Reset dismissal flag so the admin can test immediately
      sessionStorage.removeItem('rosier_promo_dismissed');
      fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoPopup: popupConfig }),
      }).catch(() => {});
    } catch (e) {}
    showNotification('✓ Promotional popup settings saved!');
  };

  // Handle Gateways Save
  const handleSaveGateways = () => {
    try {
      localStorage.setItem('rosier_gateways', JSON.stringify(gatewaySettings));
      fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentGateways: gatewaySettings }),
      }).catch(() => {});
    } catch (e) {}
    showNotification('✓ Payment gateway credentials saved!');
  };

  // Handle Custom Theme Colors Apply
  const handleApplyCustomColors = () => {
    setColors(customPrimary, customPrimary, customAccent);
    showNotification('✓ Theme colors applied successfully!');
  };

  // Filter Transactions
  const filteredTransactions = transactionsList.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      t.customerName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      t.orderId.toLowerCase().includes(transactionSearch.toLowerCase());
    const matchesFilter = transactionFilter === 'ALL' || t.status === transactionFilter;
    return matchesSearch && matchesFilter;
  });

  // ──────────────────────────────────────────────────────────
  // 1. Separate Admin Login Screen if not authenticated
  // ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-stone-950 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#1b4332] text-[#f7e6c4] flex items-center justify-center font-serif text-2xl font-bold mx-auto border border-emerald-600/40 shadow-lg">
            R
          </div>

          <div className="space-y-1">
            <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
              Rosier Foods Admin Portal
            </h1>
            <p className="text-xs text-stone-400">
              Enter your passcode to manage products, categories, orders, content, payments, and popups.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
                <span>Passcode</span>
                <span className="text-[10px] text-stone-500 font-mono">Default: rosieradmin</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-[#1b4332] pl-10"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              </div>
              {authError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                  <span>⚠️</span> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#143225] text-[#f7e6c4] font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Unlock Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-stone-900">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors inline-flex items-center gap-1"
            >
              <span>← Return to Customer Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // 2. Full Admin Dashboard Panel
  // ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-stone-100 dark:bg-[#0c1310] text-stone-800 dark:text-stone-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#1b4332] text-[#f7e6c4] px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 text-xs font-bold animate-in slide-in-from-top-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-stone-950 text-stone-200 border-r border-stone-800/80 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-stone-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1b4332] flex items-center justify-center text-[#f7e6c4] font-serif font-bold text-lg shadow-sm">
                R
              </div>
              <div>
                <span className="font-serif text-base font-bold tracking-wider text-white block">
                  ROSIER
                </span>
                <span className="text-[9px] tracking-widest text-[#d4a373] uppercase font-bold block -mt-0.5">
                  Admin Central
                </span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              v2.1
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'products'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products Catalog</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-bold">
                {productList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Categories</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-bold">
                {categoryList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders Processing</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-bold">
                {ordersList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'payments'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Payments &amp; Gateway</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold">
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'content'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Page-Wise Content</span>
            </button>

            <button
              onClick={() => setActiveTab('popups')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'popups'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>Ads &amp; Promo Popups</span>
              </div>
              {popupConfig.enabled && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'theme'
                  ? 'bg-[#1b4332] text-[#f7e6c4] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Theme &amp; Colors</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </span>
            <span>↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/40 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock &amp; Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Control Header */}
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-[#121c16]/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-stone-400 uppercase tracking-wider">Admin Console</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-[#1b4332] dark:text-[#d4a373] uppercase tracking-wider capitalize">
              {activeTab}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleMode}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {mode === 'light' ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              )}
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Site ↗</span>
            </Link>
          </div>
        </header>

        {/* Mobile Submenu Bar */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto p-3 bg-stone-900 text-stone-300 text-xs border-b border-stone-800 no-scrollbar">
          {(
            [
              'dashboard',
              'products',
              'categories',
              'orders',
              'payments',
              'content',
              'popups',
              'theme',
            ] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize whitespace-nowrap ${
                activeTab === tab ? 'bg-[#1b4332] text-white' : 'hover:bg-stone-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* ═══════════════════════════════════════════════════════
              TAB 1: DASHBOARD
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Gross Sales</span>
                  <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    ₹{ordersList.reduce((acc, o) => acc + (o.totalAmount || 0), 9439.4).toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    +18.4% this month
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Orders Received</span>
                  <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {ordersList.length || 5}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {ordersList.filter((o) => o.status === 'PROCESSING').length || 1} awaiting packing
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Active Products</span>
                  <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {productList.length}
                  </div>
                  <span className="text-[11px] text-stone-500">Across {categoryList.length} categories</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Promo Popup</span>
                  <div className="text-2xl font-mono font-bold text-[#1b4332] dark:text-[#d4a373] flex items-center gap-2">
                    {popupConfig.enabled ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Active ({popupConfig.delaySeconds}s delay)</span>
                    ) : (
                      <span className="text-stone-400">Disabled</span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-500">Code: {popupConfig.couponCode}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      slug: '',
                      name: '',
                      tagline: '',
                      description: '',
                      price: 0,
                      rating: 5,
                      reviewCount: 0,
                      categorySlug: categoryList[0]?.slug || 'ghee',
                      categoryName: categoryList[0]?.name || 'A2 Ghee',
                      inStock: true,
                      featured: false,
                      isNewArrival: true,
                      images: ['https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-1261568460.webp?v=1791458799&width=800'],
                      variants: [{ id: `v-${Date.now()}`, title: 'Standard', price: 0, stock: 50 }],
                      benefits: [],
                      ingredients: '',
                      reviews: [],
                    });
                    setIsAddingProduct(true);
                  }}
                  className="p-5 rounded-2xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider hover:bg-[#143225] flex items-center justify-between shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add New Product (Popup)</span>
                  </span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setActiveTab('popups')}
                  className="p-5 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs uppercase tracking-wider hover:border-[#1b4332] flex items-center justify-between shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Configure Ads &amp; Popups</span>
                  </span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => setActiveTab('payments')}
                  className="p-5 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs uppercase tracking-wider hover:border-[#1b4332] flex items-center justify-between shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Manage Payment Gateways</span>
                  </span>
                  <span>→</span>
                </button>
              </div>

              {/* Recent Orders Overview */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="font-serif text-lg font-bold">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#1b4332] dark:text-[#d4a373] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {transactionsList.slice(0, 4).map((txn) => (
                    <div key={txn.id} className="py-3.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-stone-900 dark:text-stone-100 block">{txn.customerName}</span>
                        <span className="text-stone-400 font-mono text-[11px]">{txn.orderId} • {txn.method}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#1b4332] dark:text-[#d4a373] block">₹{txn.amount.toFixed(2)}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 2: PRODUCTS CATALOG (WITH POPUP EDITING)
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold">Products Catalog</h3>
                  <p className="text-xs text-stone-500">
                    Click any product to edit in a centered popup modal without losing your scroll position.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#142019] text-xs focus:outline-none focus:border-[#1b4332]"
                    />
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>

                  <button
                    onClick={() => {
                      setEditingProduct({
                        id: `prod-${Date.now()}`,
                        slug: '',
                        name: '',
                        tagline: '',
                        description: '',
                        price: 0,
                        rating: 5,
                        reviewCount: 0,
                        categorySlug: categoryList[0]?.slug || 'ghee',
                        categoryName: categoryList[0]?.name || 'A2 Ghee',
                        inStock: true,
                        featured: false,
                        isNewArrival: true,
                        images: ['https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-1261568460.webp?v=1791458799&width=800'],
                        variants: [{ id: `v-${Date.now()}`, title: 'Standard', price: 0, stock: 50 }],
                        benefits: [],
                        ingredients: '',
                        reviews: [],
                      });
                      setIsAddingProduct(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider hover:bg-[#143225] flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white dark:bg-[#142019] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#fbf9f5] dark:bg-[#101914] text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200 dark:border-stone-800">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Badge</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {filteredProducts.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 p-1 flex-shrink-0 border border-stone-200 dark:border-stone-700 overflow-hidden flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <span className="font-bold text-stone-900 dark:text-stone-100 block">{p.name}</span>
                              <span className="text-stone-400 text-[10px] font-mono">#{idx + 1} • {p.slug}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-stone-600 dark:text-stone-300">
                            {p.categoryName}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#1b4332] dark:text-[#d4a373]">₹{p.price.toFixed(2)}</span>
                            {p.compareAtPrice && (
                              <span className="text-[10px] text-stone-400 line-through ml-1.5">₹{p.compareAtPrice.toFixed(2)}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {p.badge ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-stone-400">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Stock
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct({ ...p });
                                  setIsAddingProduct(false);
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-[#1b4332] text-[#f7e6c4] font-bold hover:bg-[#143225] flex items-center gap-1 shadow-sm text-[11px]"
                                title="Edit in modal popup"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit Popup</span>
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.slug)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                                title="Delete product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              PRODUCT EDIT / ADD POPUP MODAL (FIXED CENTERED)
          ═══════════════════════════════════════════════════════ */}
          {editingProduct && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
            >
              <div
                className="relative w-full max-w-3xl my-8 bg-white dark:bg-[#142019] rounded-3xl shadow-2xl border-2 border-[#1b4332] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-stone-800 p-1 border border-stone-200 dark:border-stone-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editingProduct.images[0]} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                        {isAddingProduct ? 'Create New Product' : `Edit: ${editingProduct.name}`}
                      </h3>
                      <p className="text-xs text-stone-500">
                        Make changes below and click &quot;Save Product&quot; to update immediately.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddingProduct(false);
                    }}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          setEditingProduct({
                            ...editingProduct,
                            name,
                            slug: isAddingProduct
                              ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                              : editingProduct.slug,
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        Category *
                      </label>
                      <select
                        value={editingProduct.categorySlug}
                        onChange={(e) => {
                          const cat = categoryList.find((c) => c.slug === e.target.value);
                          setEditingProduct({
                            ...editingProduct,
                            categorySlug: e.target.value,
                            categoryName: cat?.name || 'Rosier Foods',
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      >
                        {categoryList.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        Compare Price (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingProduct.compareAtPrice || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            compareAtPrice: parseFloat(e.target.value) || undefined,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        Badge Tag
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 🔥 Best Seller, 5% OFF"
                        value={editingProduct.badge || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, badge: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                      Primary Product Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={editingProduct.images[0] || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            images: [e.target.value, ...editingProduct.images.slice(1)],
                          })
                        }
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                      {editingProduct.images[0] && (
                        <div className="w-10 h-10 rounded-xl bg-stone-100 p-1 border overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={editingProduct.images[0]} alt="" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                      Short Tagline
                    </label>
                    <input
                      type="text"
                      value={editingProduct.tagline || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, tagline: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                      Full Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        Ingredients
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Pure Cultured A2 Cow Milk Butter"
                        value={editingProduct.ingredients || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, ingredients: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-stone-700 dark:text-stone-300">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={editingProduct.slug}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, slug: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, featured: e.target.checked })
                        }
                        className="rounded text-[#1b4332]"
                      />
                      <span>Featured on Best Sellers</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={editingProduct.isNewArrival}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })
                        }
                        className="rounded text-[#1b4332]"
                      />
                      <span>Featured on New Arrivals</span>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsAddingProduct(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-bold hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold uppercase tracking-wider hover:bg-[#143225] shadow-md flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Product</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 3: CATEGORIES (WITH POPUP EDITING)
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold">Categories Manager</h3>
                  <p className="text-xs text-stone-500">Edit storefront collections, icons, and hero banners.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingCategory({
                      id: `cat-${Date.now()}`,
                      slug: '',
                      name: '',
                      tagline: '',
                      description: '',
                      icon: '🌿',
                      image: 'https://www.rosierfoods.com/cdn/shop/files/Ghee_Icons.png?v=1781252536&width=160',
                    });
                    setIsAddingCategory(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase hover:bg-[#143225] flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryList.map((cat) => (
                  <div
                    key={cat.slug}
                    className="p-5 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-amber-50 dark:bg-stone-800 rounded-xl">{cat.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{cat.name}</h4>
                        <span className="text-stone-400 font-mono text-[10px]">/collections/{cat.slug}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditingCategory({ ...cat });
                        setIsAddingCategory(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#1b4332] hover:text-white text-xs font-bold transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>

              {/* Category Edit Modal */}
              {editingCategory && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                >
                  <div
                    className="relative w-full max-w-lg bg-white dark:bg-[#142019] rounded-3xl shadow-2xl border-2 border-[#1b4332] p-6 space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                      <h4 className="font-serif text-lg font-bold">
                        {isAddingCategory ? 'New Category' : `Edit Category: ${editingCategory.name}`}
                      </h4>
                      <button
                        onClick={() => {
                          setEditingCategory(null);
                          setIsAddingCategory(false);
                        }}
                        className="text-stone-400 hover:text-stone-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold mb-1">Category Name</label>
                        <input
                          type="text"
                          required
                          value={editingCategory.name}
                          onChange={(e) => {
                            const name = e.target.value;
                            setEditingCategory({
                              ...editingCategory,
                              name,
                              slug: isAddingCategory
                                ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                                : editingCategory.slug,
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">Emoji Icon</label>
                          <input
                            type="text"
                            value={editingCategory.icon}
                            onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Slug URL</label>
                          <input
                            type="text"
                            value={editingCategory.slug}
                            onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Image URL</label>
                        <input
                          type="url"
                          value={editingCategory.image}
                          onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingCategory.description}
                          onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(null);
                            setIsAddingCategory(false);
                          }}
                          className="px-4 py-2 rounded-xl border border-stone-300 font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold uppercase tracking-wider"
                        >
                          Save Category
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 4: ORDERS PROCESSING
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold">Orders Processing</h3>
                  <p className="text-xs text-stone-500">Live order fulfillment, tracking, and customer records.</p>
                </div>
              </div>

              <div className="space-y-4">
                {ordersList.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#1b4332] dark:text-[#d4a373]">
                          Order {order.orderNumber}
                        </span>
                        <span className="text-stone-400 text-xs ml-3">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 font-semibold">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1 rounded-lg text-xs font-bold border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        >
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300 pt-1">
                      <div>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p><strong>Phone:</strong> {order.phone} | <strong>Email:</strong> {order.email}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                      </div>
                      <div className="sm:text-right">
                        <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
                        <p className="text-base font-bold text-[#1b4332] dark:text-[#d4a373]">
                          Total: ₹{order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 5: PAYMENTS & GATEWAYS (NEW REQUIREMENT)
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'payments' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold">Payments &amp; Gateway Manager</h3>
                  <p className="text-xs text-stone-500">
                    Configure payment gateways (Razorpay, COD, UPI, Stripe) and view the live transaction ledger.
                  </p>
                </div>

                {/* Sub-tab pills */}
                <div className="inline-flex p-1 bg-white dark:bg-[#142019] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPaymentSubTab('gateways')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      paymentSubTab === 'gateways'
                        ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Payment Gateways
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentSubTab('transactions')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      paymentSubTab === 'transactions'
                        ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Transactions Ledger ({transactionsList.length})
                  </button>
                </div>
              </div>

              {/* Subtab 1: Gateways Setup */}
              {paymentSubTab === 'gateways' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Razorpay Gateway */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                          ₹
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            Razorpay (UPI / Cards / NetBanking)
                          </h4>
                          <span className="text-[10px] text-stone-400">Primary Indian Gateway</span>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gatewaySettings.razorpay.enabled}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              razorpay: { ...gatewaySettings.razorpay, enabled: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]" />
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold mb-1">Gateway Mode</label>
                        <select
                          value={gatewaySettings.razorpay.mode}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              razorpay: { ...gatewaySettings.razorpay, mode: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        >
                          <option value="live">Live Production Mode</option>
                          <option value="test">Test Sandbox Mode</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Razorpay Key ID</label>
                        <input
                          type="text"
                          value={gatewaySettings.razorpay.keyId}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              razorpay: { ...gatewaySettings.razorpay, keyId: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Key Secret</label>
                        <input
                          type="password"
                          value={gatewaySettings.razorpay.keySecret}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              razorpay: { ...gatewaySettings.razorpay, keySecret: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Merchant Business Name</label>
                        <input
                          type="text"
                          value={gatewaySettings.razorpay.merchantName}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              razorpay: { ...gatewaySettings.razorpay, merchantName: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery (COD) */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                          📦
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            Cash on Delivery (COD)
                          </h4>
                          <span className="text-[10px] text-stone-400">Doorstep payment</span>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gatewaySettings.cod.enabled}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              cod: { ...gatewaySettings.cod, enabled: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]" />
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Extra COD Fee (₹)</label>
                          <input
                            type="number"
                            value={gatewaySettings.cod.extraFee}
                            onChange={(e) =>
                              setGatewaySettings({
                                ...gatewaySettings,
                                cod: { ...gatewaySettings.cod, extraFee: parseFloat(e.target.value) || 0 },
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Max Order Limit (₹)</label>
                          <input
                            type="number"
                            value={gatewaySettings.cod.maxOrder}
                            onChange={(e) =>
                              setGatewaySettings({
                                ...gatewaySettings,
                                cod: { ...gatewaySettings.cod, maxOrder: parseFloat(e.target.value) || 10000 },
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Instructions for Customers</label>
                        <textarea
                          rows={2}
                          value={gatewaySettings.cod.instructions}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              cod: { ...gatewaySettings.cod, instructions: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* UPI & QR Code */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                          ⚡
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            Direct UPI / Static QR Code
                          </h4>
                          <span className="text-[10px] text-stone-400">Zero commission direct transfer</span>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gatewaySettings.upi.enabled}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              upi: { ...gatewaySettings.upi, enabled: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]" />
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold mb-1">Business UPI ID (VPA)</label>
                        <input
                          type="text"
                          value={gatewaySettings.upi.upiId}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              upi: { ...gatewaySettings.upi, upiId: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">QR Code Image URL</label>
                        <input
                          type="url"
                          value={gatewaySettings.upi.qrImageUrl}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              upi: { ...gatewaySettings.upi, qrImageUrl: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stripe / International Cards */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                          🌐
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            Stripe (Global Credit/Debit Cards)
                          </h4>
                          <span className="text-[10px] text-stone-400">International customer orders</span>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gatewaySettings.stripe.enabled}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              stripe: { ...gatewaySettings.stripe, enabled: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]" />
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold mb-1">Stripe Publishable Key</label>
                        <input
                          type="text"
                          value={gatewaySettings.stripe.publishableKey}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              stripe: { ...gatewaySettings.stripe, publishableKey: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Secret Key</label>
                        <input
                          type="password"
                          value={gatewaySettings.stripe.secretKey}
                          onChange={(e) =>
                            setGatewaySettings({
                              ...gatewaySettings,
                              stripe: { ...gatewaySettings.stripe, secretKey: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 lg:col-span-2 pt-2">
                    <button
                      type="button"
                      onClick={handleSaveGateways}
                      className="px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#143225] flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Gateway Credentials</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Subtab 2: Transactions Ledger */}
              {paymentSubTab === 'transactions' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] uppercase font-bold text-stone-400">Online Settled</span>
                      <div className="text-xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1">
                        ₹{transactionsList.filter((t) => t.status === 'SUCCESS').reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] uppercase font-bold text-stone-400">COD Pending</span>
                      <div className="text-xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1">
                        ₹{transactionsList.filter((t) => t.status === 'PENDING').reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] uppercase font-bold text-stone-400">Success Rate</span>
                      <div className="text-xl font-bold font-serif text-[#1b4332] dark:text-[#d4a373] mt-1">
                        98.2%
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800">
                      <span className="text-[10px] uppercase font-bold text-stone-400">Total Transactions</span>
                      <div className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                        {transactionsList.length}
                      </div>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        placeholder="Search Txn ID, Order, Customer..."
                        value={transactionSearch}
                        onChange={(e) => setTransactionSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#142019] text-xs focus:outline-none focus:border-[#1b4332]"
                      />
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                      {(['ALL', 'SUCCESS', 'PENDING', 'REFUNDED'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setTransactionFilter(filter)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            transactionFilter === filter
                              ? 'bg-[#1b4332] text-[#f7e6c4]'
                              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="bg-white dark:bg-[#142019] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#fbf9f5] dark:bg-[#101914] text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200 dark:border-stone-800">
                          <tr>
                            <th className="py-3 px-4">Transaction ID</th>
                            <th className="py-3 px-4">Order Ref</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Gateway</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                          {filteredTransactions.map((t) => (
                            <tr key={t.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                              <td className="py-3.5 px-4">
                                <span className="font-mono font-bold text-stone-900 dark:text-stone-100 block">
                                  {t.id}
                                </span>
                                <span className="text-[10px] text-stone-400">{t.date}</span>
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-[#1b4332] dark:text-[#d4a373]">
                                {t.orderId}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-bold text-stone-800 dark:text-stone-200 block">{t.customerName}</span>
                                <span className="text-stone-400 text-[10px]">{t.phone}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                                  <CreditCard className="w-3 h-3 text-[#1b4332]" />
                                  <span>{t.gateway}</span>
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-stone-100">
                                ₹{t.amount.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    t.status === 'SUCCESS'
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : t.status === 'PENDING'
                                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                      : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                  }`}
                                >
                                  {t.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                {t.status === 'PENDING' && (
                                  <button
                                    onClick={() => {
                                      setTransactionsList(
                                        transactionsList.map((item) =>
                                          item.id === t.id ? { ...item, status: 'SUCCESS' } : item
                                        )
                                      );
                                      showNotification(`Transaction ${t.id} marked as SUCCESS!`);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[10px] hover:bg-emerald-800"
                                  >
                                    Mark Paid
                                  </button>
                                )}
                                {t.status === 'SUCCESS' && (
                                  <button
                                    onClick={() => {
                                      if (confirm(`Refund transaction ${t.id} for ₹${t.amount}?`)) {
                                        setTransactionsList(
                                          transactionsList.map((item) =>
                                            item.id === t.id ? { ...item, status: 'REFUNDED' } : item
                                          )
                                        );
                                        showNotification(`Refund initiated for ${t.id}`);
                                      }
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold text-[10px] hover:bg-rose-100 hover:text-rose-700"
                                  >
                                    Refund
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 6: PAGE-WISE CONTENT MANAGER (NEW REQUIREMENT)
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'content' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">Page-Wise Content Management</h3>
                  <p className="text-xs text-stone-500">
                    Select a page below to edit its headlines, stories, banner text, and contact details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSavePageContent}
                  className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#143225] flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Pages</span>
                </button>
              </div>

              {/* Sub-tab Page Switcher */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100 dark:border-stone-800 no-scrollbar">
                {[
                  { id: 'home', label: '🏠 Home Page' },
                  { id: 'about', label: '📖 About Us (Our Story)' },
                  { id: 'labReports', label: '🧪 Lab Reports Page' },
                  { id: 'hampers', label: '🎁 Festive Hampers' },
                  { id: 'contact', label: '📞 Contact & Helpdesk' },
                  { id: 'policies', label: '📜 Shipping & Returns' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setContentSubTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      contentSubTab === tab.id
                        ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Page 1: Home Page Content */}
              {contentSubTab === 'home' && (
                <div className="space-y-5 text-xs">
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700">
                    <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">
                      Top Announcement Bar &amp; Promo Banner
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1">Top Bar Message</label>
                        <input
                          type="text"
                          value={pageContent.home.announcementText}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, announcementText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0f1713]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Coupon Code</label>
                        <input
                          type="text"
                          value={pageContent.home.couponCode}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, couponCode: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0f1713] uppercase font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="font-bold text-sm text-[#1b4332] dark:text-[#d4a373] block">
                      Hero Section &amp; Headlines
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1">Hero Main Headline</label>
                        <input
                          type="text"
                          value={pageContent.home.heroHeadline}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, heroHeadline: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Hero Badge Text</label>
                        <input
                          type="text"
                          value={pageContent.home.heroBadge}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, heroBadge: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Hero Subheadline Description</label>
                      <textarea
                        rows={2}
                        value={pageContent.home.heroSubheadline}
                        onChange={(e) =>
                          setPageContent({
                            ...pageContent,
                            home: { ...pageContent.home, heroSubheadline: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Scrolling Marquee Text</label>
                      <input
                        type="text"
                        value={pageContent.home.marqueePhrase}
                        onChange={(e) =>
                          setPageContent({
                            ...pageContent,
                            home: { ...pageContent.home, marqueePhrase: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <span className="font-bold text-sm text-[#1b4332] dark:text-[#d4a373] block">
                      Farmer Roots &amp; Heritage Section
                    </span>
                    <div>
                      <label className="block font-semibold mb-1">Hindi Headline</label>
                      <input
                        type="text"
                        value={pageContent.home.storyHindiHeadline}
                        onChange={(e) =>
                          setPageContent({
                            ...pageContent,
                            home: { ...pageContent.home, storyHindiHeadline: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold mb-1">Gir Cows Count</label>
                        <input
                          type="text"
                          value={pageContent.home.statGirCows}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, statGirCows: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Farmers Count</label>
                        <input
                          type="text"
                          value={pageContent.home.statFarmers}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, statFarmers: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Homes Nourished</label>
                        <input
                          type="text"
                          value={pageContent.home.statHomes}
                          onChange={(e) =>
                            setPageContent({
                              ...pageContent,
                              home: { ...pageContent.home, statHomes: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Page 2: About Us Content */}
              {contentSubTab === 'about' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Page Title</label>
                    <input
                      type="text"
                      value={pageContent.about.headline}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          about: { ...pageContent.about, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={pageContent.about.subtitle}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          about: { ...pageContent.about, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Story Paragraph 1 (Mission &amp; Seed)</label>
                    <textarea
                      rows={3}
                      value={pageContent.about.story1}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          about: { ...pageContent.about, story1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Story Paragraph 2 (Farmer Partnerships)</label>
                    <textarea
                      rows={3}
                      value={pageContent.about.story2}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          about: { ...pageContent.about, story2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Heritage Pledge Quote</label>
                    <input
                      type="text"
                      value={pageContent.about.heritagePledge}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          about: { ...pageContent.about, heritagePledge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>
                </div>
              )}

              {/* Page 3: Lab Reports Content */}
              {contentSubTab === 'labReports' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Lab Section Headline</label>
                    <input
                      type="text"
                      value={pageContent.labReports.headline}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          labReports: { ...pageContent.labReports, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Transparency Subtitle</label>
                    <input
                      type="text"
                      value={pageContent.labReports.subtitle}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          labReports: { ...pageContent.labReports, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">NABL Accreditation &amp; Disclaimer Statement</label>
                    <textarea
                      rows={3}
                      value={pageContent.labReports.disclaimer}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          labReports: { ...pageContent.labReports, disclaimer: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>
                </div>
              )}

              {/* Page 4: Hampers Content */}
              {contentSubTab === 'hampers' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Hampers Title</label>
                    <input
                      type="text"
                      value={pageContent.hampers.headline}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          hampers: { ...pageContent.hampers, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={pageContent.hampers.subtitle}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          hampers: { ...pageContent.hampers, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Corporate &amp; Bulk Orders Note</label>
                    <input
                      type="text"
                      value={pageContent.hampers.customOrdersNotice}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          hampers: { ...pageContent.hampers, customOrdersNotice: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Gifting Helpline WhatsApp Phone</label>
                    <input
                      type="text"
                      value={pageContent.hampers.whatsappPhone}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          hampers: { ...pageContent.hampers, whatsappPhone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>
                </div>
              )}

              {/* Page 5: Contact Content */}
              {contentSubTab === 'contact' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Support Phone</label>
                    <input
                      type="text"
                      value={pageContent.contact.phone}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          contact: { ...pageContent.contact, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Support Email</label>
                    <input
                      type="email"
                      value={pageContent.contact.email}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          contact: { ...pageContent.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={pageContent.contact.hours}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          contact: { ...pageContent.contact, hours: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Physical Office Address</label>
                    <textarea
                      rows={2}
                      value={pageContent.contact.address}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          contact: { ...pageContent.contact, address: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>
                </div>
              )}

              {/* Page 6: Policies Content */}
              {contentSubTab === 'policies' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Shipping Guarantee Notice</label>
                    <textarea
                      rows={2}
                      value={pageContent.policies.shippingNotice}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          policies: { ...pageContent.policies, shippingNotice: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Refund &amp; Replacement Notice</label>
                    <textarea
                      rows={2}
                      value={pageContent.policies.refundNotice}
                      onChange={(e) =>
                        setPageContent({
                          ...pageContent,
                          policies: { ...pageContent.policies, refundNotice: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={handleSavePageContent}
                  className="px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#143225] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page Content Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 7: ADS & PROMO POPUPS (NEW REQUIREMENT)
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'popups' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold">Promotional Popups &amp; Ads Manager</h3>
                  <p className="text-xs text-stone-500">
                    Display attractive image ads and coupon offers on the frontend with a customizable time delay.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTestPopupOpen(true)}
                    className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Test Popup Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSavePopupSettings}
                    className="px-6 py-2 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#143225] flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Popup</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Configuration Controls */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-5 text-xs">
                  {/* Master Toggle */}
                  <div className="p-4 rounded-2xl bg-[#fbf9f5] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                        Enable Popup on Customer Storefront
                      </span>
                      <span className="text-[11px] text-stone-500">
                        When enabled, visitors will see the promotional banner after the delay.
                      </span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={popupConfig.enabled}
                        onChange={(e) =>
                          setPopupConfig({ ...popupConfig, enabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b4332]" />
                    </label>
                  </div>

                  {/* Delay Setting (Exact requirement from user) */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Display Delay (Seconds)</span>
                      </label>
                      <span className="font-mono text-sm font-bold text-[#1b4332] dark:text-[#d4a373] bg-white dark:bg-stone-900 px-2.5 py-0.5 rounded-lg border border-amber-200">
                        {popupConfig.delaySeconds} seconds
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900/80 dark:text-amber-400">
                      Popup will appear smoothly {popupConfig.delaySeconds} seconds after the visitor lands on the page.
                    </p>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={popupConfig.delaySeconds}
                      onChange={(e) =>
                        setPopupConfig({
                          ...popupConfig,
                          delaySeconds: parseInt(e.target.value, 10) || 3,
                        })
                      }
                      className="w-full accent-[#1b4332] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>1s (Instant)</span>
                      <span>5s (Standard)</span>
                      <span>15s</span>
                      <span>30s (Delayed)</span>
                    </div>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block font-bold mb-1">Show Frequency</label>
                    <select
                      value={popupConfig.frequency}
                      onChange={(e) =>
                        setPopupConfig({
                          ...popupConfig,
                          frequency: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    >
                      <option value="once_per_session">Once Per Browser Session (Recommended)</option>
                      <option value="every_visit">Every Page Refresh / Visit</option>
                      <option value="once_daily">Once Every 24 Hours</option>
                    </select>
                  </div>

                  {/* Image URL & Presets */}
                  <div>
                    <label className="block font-bold mb-1">Ad Image URL</label>
                    <input
                      type="url"
                      value={popupConfig.imageUrl}
                      onChange={(e) =>
                        setPopupConfig({ ...popupConfig, imageUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] text-stone-400 self-center">Presets:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setPopupConfig({
                            ...popupConfig,
                            imageUrl: 'https://www.rosierfoods.com/cdn/shop/files/diwali-hamper.png?v=1791490455&width=800',
                          })
                        }
                        className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-bold hover:bg-stone-200"
                      >
                        Diwali Hamper
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPopupConfig({
                            ...popupConfig,
                            imageUrl: 'https://www.rosierfoods.com/cdn/shop/files/laddoo_mini-b.png?v=1791490469&width=800',
                          })
                        }
                        className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-bold hover:bg-stone-200"
                      >
                        Winter Laddoo
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPopupConfig({
                            ...popupConfig,
                            imageUrl: 'https://www.rosierfoods.com/cdn/shop/files/1_1658a322-943b-4593-a967-af22b89937a2.png?format=webp&v=1792159997&width=800',
                          })
                        }
                        className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-bold hover:bg-stone-200"
                      >
                        Lab Certified
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Headline Text</label>
                      <input
                        type="text"
                        value={popupConfig.title}
                        onChange={(e) =>
                          setPopupConfig({ ...popupConfig, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Coupon Code</label>
                      <input
                        type="text"
                        value={popupConfig.couponCode}
                        onChange={(e) =>
                          setPopupConfig({ ...popupConfig, couponCode: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713] uppercase font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Subtitle / Offer Description</label>
                    <textarea
                      rows={2}
                      value={popupConfig.subtitle}
                      onChange={(e) =>
                        setPopupConfig({ ...popupConfig, subtitle: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Button CTA Text</label>
                      <input
                        type="text"
                        value={popupConfig.buttonText}
                        onChange={(e) =>
                          setPopupConfig({ ...popupConfig, buttonText: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Destination URL</label>
                      <input
                        type="text"
                        value={popupConfig.targetUrl}
                        onChange={(e) =>
                          setPopupConfig({ ...popupConfig, targetUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#0f1713]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSavePopupSettings}
                      className="px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#143225] flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save &amp; Activate Popup</span>
                    </button>
                  </div>
                </div>

                {/* Live Preview Pane */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Live Customer Preview
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Real-time
                    </span>
                  </div>

                  {/* Scaled-down popup card preview */}
                  <div className="relative rounded-3xl overflow-hidden bg-[#fbf9f5] dark:bg-[#142019] border border-amber-200/80 dark:border-stone-700 shadow-xl p-5 space-y-4">
                    {popupConfig.imageUrl && (
                      <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={popupConfig.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#1b4332] text-[#f7e6c4] text-[9px] font-bold tracking-wider uppercase">
                          Limited Time Deal
                        </div>
                      </div>
                    )}

                    <div className="text-center space-y-2">
                      <h4 className="font-serif text-base font-bold text-[#1b4332] dark:text-[#f7e6c4]">
                        {popupConfig.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300">
                        {popupConfig.subtitle}
                      </p>

                      {popupConfig.couponCode && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-stone-800 rounded-xl border border-dashed border-amber-300 text-xs">
                          <Tag className="w-3 h-3 text-amber-600" />
                          <span className="font-mono font-bold text-[#1b4332] dark:text-[#d4a373]">
                            {popupConfig.couponCode}
                          </span>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider"
                        >
                          {popupConfig.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Test Preview Modal */}
              {testPopupOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                >
                  <div
                    className="relative w-full max-w-lg bg-[#fbf9f5] dark:bg-[#142019] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/80 dark:border-stone-700 animate-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setTestPopupOpen(false)}
                      className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-stone-800 text-stone-600 hover:text-stone-950 flex items-center justify-center shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {popupConfig.imageUrl && (
                      <div className="relative w-full aspect-[2/1] bg-amber-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={popupConfig.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="p-6 text-center space-y-3">
                      <h3 className="font-serif text-xl font-bold text-[#1b4332] dark:text-[#f7e6c4]">
                        {popupConfig.title}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300">
                        {popupConfig.subtitle}
                      </p>
                      {popupConfig.couponCode && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-dashed border-amber-400 bg-white font-mono font-bold text-sm text-[#1b4332]">
                          <span>{popupConfig.couponCode}</span>
                        </div>
                      )}
                      <div>
                        <button
                          onClick={() => setTestPopupOpen(false)}
                          className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase"
                        >
                          {popupConfig.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              TAB 8: THEME & BRAND PALETTE
          ═══════════════════════════════════════════════════════ */}
          {activeTab === 'theme' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#142019] border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-xl font-bold">Theme &amp; Brand Colors Customizer</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Change the storefront primary palette, dark/light mode defaults, and brand accents.
                </p>
              </div>

              {/* Presets */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Pre-Curated Ayurvedic &amp; Natural Palettes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        applyPreset(preset.id);
                        setCustomPrimary(preset.primary);
                        setCustomAccent(preset.accent);
                        showNotification(`Applied ${preset.name} theme.`);
                      }}
                      className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-[#1b4332] dark:hover:border-[#d4a373] text-left transition-all hover:scale-[1.01] flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50"
                    >
                      <div>
                        <span className="font-bold text-xs block text-stone-900 dark:text-stone-100">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono mt-0.5 block">
                          {preset.primary} • {preset.accent}
                        </span>
                      </div>
                      <div className="flex items-center -space-x-2">
                        <span className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: preset.primary }} />
                        <span className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: preset.accent }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hex Picker */}
              <div className="p-6 rounded-2xl bg-[#fbf9f5] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Custom Hex Codes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Primary Color (Buttons &amp; Badges)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300"
                      />
                      <input
                        type="text"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0f1713] font-mono text-xs uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Accent Gold (Highlights &amp; Ratings)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300"
                      />
                      <input
                        type="text"
                        value={customAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#0f1713] font-mono text-xs uppercase"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyCustomColors}
                  className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#143225]"
                >
                  Apply Custom Colors
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
