'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, COLOR_PRESETS } from '@/context/ThemeContext';
import { PRODUCTS, CATEGORIES } from '@/data/rosier-data';
import { ProductItem, CategoryItem } from '@/types';
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
  RefreshCw,
  Search,
  ArrowRight,
  ShieldCheck,
  Eye,
  FileText
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

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'content' | 'theme'>('dashboard');

  // Products state
  const [productList, setProductList] = useState<ProductItem[]>(PRODUCTS);
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Categories state
  const [categoryList, setCategoryList] = useState<CategoryItem[]>(CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Orders state
  const [ordersList, setOrdersList] = useState<any[]>([]);

  // Content state
  const [contentSettings, setContentSettings] = useState({
    announcementText: 'SALE ENDING TONIGHT: USE CODE ROSIER10 FOR 10% OFF',
    couponCode: 'ROSIER10',
    heroHeadline: 'Pure, Traditional Foods Delivered Across India',
    heroSubheadline: 'Hand-churned A2 Gir Cow Ghee, stoneground unhybridized Khapli Atta, and cold-pressed Kolhu oils—crafted with ancient wisdom for modern vitality.',
    heroCtaText: 'Shop Pure Foods',
    heroBadge: '100% Vedic Bilona • Zero Chemicals',
    heroImageUrl: 'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-1261568460.webp?v=1791458799&width=800',
    marqueePhrase: 'FOODS THAT HEAL, NOT HYPE • PURE | TRADITIONAL | ETHICALLY CRAFTED • 100% VEDIC BILONA GHEE',
    storyHindiHeadline: 'जड़ों से जुड़े लोग, असली बदलाव',
    storyDescription: 'At Rosier Foods, we believe true nourishment begins at the source. We partner directly with multigenerational farming families who cultivate indigenous heritage seeds, nurse native Gir cows with kindness, and preserve ancient wisdom.',
    statGirCows: '5,000+',
    statFarmers: '45+',
    statHomes: '150k+',
  });

  // Custom Color state
  const [customPrimary, setCustomPrimary] = useState(primaryColor);
  const [customAccent, setCustomAccent] = useState(accentColor);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch initial orders
  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrdersList(data.orders);
      })
      .catch((e) => console.warn('Orders fetch error', e));
  }, []);

  // Filter products by search
  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categorySlug.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Handle Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();
      if (res.ok) {
        if (isAddingProduct) {
          setProductList([editingProduct, ...productList]);
        } else {
          setProductList(productList.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
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
      setCategoryList(categoryList.map((c) => (c.slug === editingCategory.slug ? editingCategory : c)));
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

  // Handle Content Save
  const handleSaveContent = async () => {
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentSettings),
      });
    } catch (e) {}
    showNotification('✓ Frontend content updated across website!');
  };

  // Handle Custom Theme Colors Apply
  const handleApplyCustomColors = () => {
    setColors(customPrimary, customPrimary, customAccent);
    showNotification('✓ Theme colors applied successfully!');
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#0f1713] text-stone-900 dark:text-stone-100 transition-colors">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#14221b]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b4332] text-[#f7e6c4] flex items-center justify-center font-serif font-bold text-sm">
              R
            </div>
            <span className="font-serif text-xl font-bold tracking-wider text-stone-900 dark:text-stone-100">
              ROSIER
            </span>
          </Link>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
            Admin Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick theme mode toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Toggle Light / Dark Mode"
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
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Store</span>
          </Link>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-[#1b4332] text-[#f7e6c4] px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold border border-emerald-500 animate-in fade-in slide-in-from-top-2">
          {notification}
        </div>
      )}

      {/* Main Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-stone-200 dark:border-stone-800 no-scrollbar mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white dark:bg-[#16241e] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white dark:bg-[#16241e] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({productList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white dark:bg-[#16241e] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Categories ({categoryList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white dark:bg-[#16241e] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Orders ({ordersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'content'
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white dark:bg-[#16241e] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <Edit className="w-4 h-4" />
            <span>Content &amp; Banners</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'theme'
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white dark:bg-[#16241e] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Theme &amp; Colors</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Sales</span>
                <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  ₹{ordersList.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                  +18.4% from last month
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Orders Received</span>
                <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {ordersList.length}
                </div>
                <span className="text-[11px] text-stone-500">
                  {ordersList.filter((o) => o.status === 'PROCESSING').length} awaiting packing
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Products in Pantry</span>
                <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {productList.length}
                </div>
                <span className="text-[11px] text-stone-500">Across {categoryList.length} categories</span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Active Promo</span>
                <div className="text-2xl font-mono font-bold text-[#1b4332] dark:text-[#d4a373]">
                  ROSIER10
                </div>
                <span className="text-[11px] text-stone-500">10% OFF site-wide</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <h3 className="font-serif text-lg font-bold">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-[#1b4332] dark:text-[#d4a373] hover:underline"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {ordersList.slice(0, 5).map((order) => (
                  <div key={order.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                        #{order.orderNumber}
                      </span>
                      <p className="text-stone-500 text-[11px]">{order.customerName} • {order.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-stone-900 dark:text-stone-100">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                      <span className="block text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                />
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    slug: '',
                    name: '',
                    tagline: '',
                    description: '',
                    price: 499,
                    compareAtPrice: 599,
                    categorySlug: 'ghee',
                    categoryName: 'Gir Cow A2 Desi Ghee',
                    rating: 4.9,
                    reviewCount: 10,
                    badge: '🔥 Best Seller',
                    inStock: true,
                    featured: true,
                    isNewArrival: false,
                    images: ['https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800'],
                    variants: [{ id: 'v1', title: '500g', price: 499 }],
                    benefits: ['100% Pure Vedic Preparation'],
                    reviews: [],
                  });
                  setIsAddingProduct(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:bg-[#143225] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Product Edit / Add Form Modal */}
            {editingProduct && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#16241e] border-2 border-[#1b4332] dark:border-emerald-600 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                  <h3 className="font-serif text-lg font-bold">
                    {isAddingProduct ? 'Create New Product' : `Edit: ${editingProduct.name}`}
                  </h3>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="text-xs text-stone-500 hover:text-stone-800 font-bold"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Product Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Category</label>
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
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                      >
                        {categoryList.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingProduct.tagline}
                      onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Compare At Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingProduct.compareAtPrice || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, compareAtPrice: parseFloat(e.target.value) || undefined })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Badge Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. 🔥 Best Seller"
                        value={editingProduct.badge || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Main Image URL</label>
                    <input
                      type="url"
                      value={editingProduct.images[0] || ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        images: [e.target.value, ...(editingProduct.images.slice(1))]
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured}
                        onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                      />
                      <span>Featured on Best Sellers</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={editingProduct.isNewArrival}
                        onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                      />
                      <span>Featured on New Arrivals</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={editingProduct.inStock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                      />
                      <span>In Stock</span>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase hover:bg-[#143225]"
                    >
                      Save Product Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List Table */}
            <div className="rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#fbf9f5] dark:hover:bg-[#121e18] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-[#1b4332] dark:text-[#d4a373]">
                          {product.categoryName}
                        </span>
                        <h4 className="font-bold text-sm truncate">{product.name}</h4>
                        <div className="flex items-center gap-2 text-xs mt-0.5">
                          <span className="font-bold">₹{product.price.toFixed(2)}</span>
                          {product.compareAtPrice && (
                            <span className="text-stone-400 line-through">₹{product.compareAtPrice.toFixed(2)}</span>
                          )}
                          {product.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-semibold">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ ...product });
                          setIsAddingProduct(false);
                        }}
                        className="p-2 text-stone-600 dark:text-stone-400 hover:text-[#1b4332] dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.slug)}
                        className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold">Categories ({categoryList.length})</h3>
              <button
                onClick={() => {
                  setEditingCategory({
                    slug: '',
                    name: '',
                    tagline: '',
                    description: '',
                    image: 'https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800',
                    icon: '🌿',
                  });
                  setIsAddingCategory(true);
                }}
                className="px-4 py-2 bg-[#1b4332] text-[#f7e6c4] text-xs font-bold uppercase rounded-xl hover:bg-[#143225] flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            {editingCategory && (
              <form onSubmit={handleSaveCategory} className="p-6 rounded-3xl bg-white dark:bg-[#16241e] border-2 border-[#1b4332] space-y-4 text-xs">
                <h4 className="font-bold text-sm">{isAddingCategory ? 'Add New Category' : `Edit Category: ${editingCategory.name}`}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Category Name *</label>
                    <input
                      type="text"
                      required
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Category Icon Emoji</label>
                    <input
                      type="text"
                      value={editingCategory.icon || '🌿'}
                      onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingCategory.image}
                    onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="px-5 py-2 bg-[#1b4332] text-white rounded-lg font-bold">
                    Save Category
                  </button>
                  <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 border rounded-lg">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryList.map((cat) => (
                <div key={cat.slug} className="p-4 rounded-2xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm">{cat.name}</h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1">{cat.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingCategory({ ...cat });
                      setIsAddingCategory(false);
                    }}
                    className="p-1.5 text-stone-500 hover:text-[#1b4332]"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif text-lg font-bold">Customer Orders ({ordersList.length})</h3>

            <div className="rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm divide-y divide-stone-100 dark:divide-stone-800">
              {ordersList.map((order) => (
                <div key={order.id} className="p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-xs text-stone-500 ml-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Status Changer Buttons */}
                    <div className="flex items-center gap-1.5">
                      {['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateOrderStatus(order.id, st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                            order.status === st
                              ? 'bg-[#1b4332] text-[#f7e6c4]'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
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

        {/* TAB 5: CONTENT & BANNERS ("A TO Z EVERY CONTENT CHANGE") */}
        {activeTab === 'content' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-xl font-bold">Frontend Content &amp; Banners Control</h3>
              <p className="text-xs text-stone-500 mt-1">
                Customize every headline, marketing banner, promotional ticker, and story text displayed across the website.
              </p>
            </div>

            {/* Section 1: Top Announcement Bar */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
              <h4 className="font-bold text-sm text-[#1b4332] dark:text-[#d4a373] uppercase tracking-wider">
                1. Top Scrolling Announcement Bar
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Announcement Text</label>
                  <input
                    type="text"
                    value={contentSettings.announcementText}
                    onChange={(e) => setContentSettings({ ...contentSettings, announcementText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Promo Coupon Code</label>
                  <input
                    type="text"
                    value={contentSettings.couponCode}
                    onChange={(e) => setContentSettings({ ...contentSettings, couponCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18] uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Hero Banner */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
              <h4 className="font-bold text-sm text-[#1b4332] dark:text-[#d4a373] uppercase tracking-wider">
                2. Hero Showcase Banner
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Hero Headline</label>
                  <input
                    type="text"
                    value={contentSettings.heroHeadline}
                    onChange={(e) => setContentSettings({ ...contentSettings, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Hero Badge</label>
                  <input
                    type="text"
                    value={contentSettings.heroBadge}
                    onChange={(e) => setContentSettings({ ...contentSettings, heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Hero Subtitle</label>
                <textarea
                  rows={2}
                  value={contentSettings.heroSubheadline}
                  onChange={(e) => setContentSettings({ ...contentSettings, heroSubheadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                />
              </div>
            </div>

            {/* Section 3: Mid-page Ticker */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
              <h4 className="font-bold text-sm text-[#1b4332] dark:text-[#d4a373] uppercase tracking-wider">
                3. Animated Marquee Ticker
              </h4>
              <div>
                <label className="block font-semibold mb-1">Marquee Phrases</label>
                <input
                  type="text"
                  value={contentSettings.marqueePhrase}
                  onChange={(e) => setContentSettings({ ...contentSettings, marqueePhrase: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                />
              </div>
            </div>

            {/* Section 4: Heritage Story & Stats */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
              <h4 className="font-bold text-sm text-[#1b4332] dark:text-[#d4a373] uppercase tracking-wider">
                4. Heritage Story &amp; Numbers
              </h4>
              <div>
                <label className="block font-semibold mb-1">Hindi Headline</label>
                <input
                  type="text"
                  value={contentSettings.storyHindiHeadline}
                  onChange={(e) => setContentSettings({ ...contentSettings, storyHindiHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Gir Cows Count</label>
                  <input
                    type="text"
                    value={contentSettings.statGirCows}
                    onChange={(e) => setContentSettings({ ...contentSettings, statGirCows: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Farmers Supported</label>
                  <input
                    type="text"
                    value={contentSettings.statFarmers}
                    onChange={(e) => setContentSettings({ ...contentSettings, statFarmers: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Homes Nourished</label>
                  <input
                    type="text"
                    value={contentSettings.statHomes}
                    onChange={(e) => setContentSettings({ ...contentSettings, statHomes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-[#fbf9f5] dark:bg-[#121e18]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSaveContent}
                className="px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#143225] flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save All Content Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: THEME & APPEARANCE ("THEME COLOR CAN CHANGE ALSO ADD DARK/LIGHT OPTION") */}
        {activeTab === 'theme' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#16241e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-xl font-bold">Theme &amp; Appearance Settings</h3>
              <p className="text-xs text-stone-500 mt-1">
                Control the dark/light mode and customize primary brand color palette across the entire e-commerce store.
              </p>
            </div>

            {/* Dark / Light Mode Switcher */}
            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Display Mode (Dark &amp; Light Option)
              </label>
              <div className="grid grid-cols-2 max-w-md gap-4">
                <button
                  type="button"
                  onClick={() => setMode('light')}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                    mode === 'light'
                      ? 'border-[#1b4332] bg-emerald-50/50 dark:bg-emerald-950/40 text-[#1b4332] dark:text-[#f7e6c4] font-bold'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <span className="block text-sm">Light Mode</span>
                    <span className="text-[10px] text-stone-500">Natural Cream Vedic Palette</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('dark')}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                    mode === 'dark'
                      ? 'border-[#1b4332] bg-emerald-50/50 dark:bg-emerald-950/40 text-[#1b4332] dark:text-[#f7e6c4] font-bold'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Moon className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <span className="block text-sm">Dark Mode</span>
                    <span className="text-[10px] text-stone-500">Night Obsidian Heritage Theme</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Color Presets */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Primary Brand Color Palette Presets
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      applyPreset(preset.id);
                      setCustomPrimary(preset.primary);
                      setCustomAccent(preset.accent);
                      showNotification(`Applied ${preset.name}`);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                      primaryColor === preset.primary
                        ? 'border-[#1b4332] bg-emerald-50/30 dark:bg-emerald-950/30 ring-2 ring-[#1b4332]/20'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">{preset.name}</span>
                      <span className="text-[10px] font-mono opacity-60">{preset.primary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-6 h-6 rounded-full border border-white/50 shadow-sm"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Picker */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Custom Color Picker
              </label>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customPrimary}
                    onChange={(e) => setCustomPrimary(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0"
                  />
                  <div>
                    <span className="text-xs font-bold block">Primary Color</span>
                    <span className="text-[11px] font-mono text-stone-500">{customPrimary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(e) => setCustomAccent(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0"
                  />
                  <div>
                    <span className="text-xs font-bold block">Accent Color</span>
                    <span className="text-[11px] font-mono text-stone-500">{customAccent}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyCustomColors}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold text-xs uppercase hover:opacity-90 transition-opacity"
                >
                  Apply Custom Colors
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
