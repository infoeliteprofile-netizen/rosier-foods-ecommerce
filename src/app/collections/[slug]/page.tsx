import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProducts } from '@/lib/prisma';
import { CATEGORIES } from '@/data/rosier-data';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, Filter } from 'lucide-react';
import type { Metadata } from 'next';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'all') {
    return { title: 'All Products | Rosier Foods' };
  }
  if (slug === 'best-sellers') {
    return { title: 'Loved Across Generations (Best Sellers) | Rosier Foods' };
  }
  if (slug === 'new-launch') {
    return { title: 'New Arrivals | Rosier Foods' };
  }
  const category = CATEGORIES.find((c) => c.slug === slug);
  return {
    title: category ? `${category.name} | Rosier Foods` : 'Shop | Rosier Foods',
    description: category?.description || 'Pure, traditional foods from Rosier Foods.',
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  let title = 'All Products';
  let tagline = 'Pure, authentic, and traditional superfoods crafted with ancient wisdom';
  let description =
    'Discover our complete range of Vedic Bilona Ghee, ancient stoneground flours, cold-pressed oils, and natural sun-dried pickles.';

  let products = await getProducts();

  if (slug === 'all') {
    // all products
  } else if (slug === 'best-sellers') {
    title = 'Loved Across Generations';
    tagline = 'Our most cherished traditional recipes';
    description = 'Hand-churned A2 Ghee, ancient Khapli wheat atta, and pure sun-dried pickles loved by thousands of families.';
    products = products.filter((p) => p.featured);
  } else if (slug === 'new-launch') {
    title = 'New Arrivals';
    tagline = 'Freshly harvested & crafted with care';
    description = 'Newly milled ancient flours, winter energy laddoos, and cold-pressed extractions.';
    products = products.filter((p) => p.isNewArrival);
  } else {
    const category = CATEGORIES.find((c) => c.slug === slug);
    if (!category) {
      notFound();
    }
    title = category.name;
    tagline = category.tagline || '100% Pure & Traditional';
    description = category.description;
    products = products.filter((p) => p.categorySlug === slug);
  }

  // Sorting
  if (sort === 'price-asc') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products = [...products].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link href="/collections/all" className="hover:text-stone-900">
          Collections
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-semibold text-stone-900">{title}</span>
      </nav>

      {/* Collection Header Banner */}
      <div className="rounded-3xl bg-[#1b4332] text-white p-8 sm:p-12 relative overflow-hidden shadow-lg border border-[#2d5a45]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#d4a373]">
            Rosier Heritage Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7e6c4]">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Link
          href="/collections/all"
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
            slug === 'all'
              ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          All ({products.length})
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              slug === cat.slug
                ? 'bg-[#1b4332] text-[#f7e6c4] shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Filter / Sort bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-y border-stone-200 text-xs text-stone-600">
        <div className="font-medium">
          Showing <span className="font-bold text-stone-900">{products.length}</span> authentic products
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sort By:
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/collections/${slug}`}
              className={`px-2.5 py-1 rounded-lg ${
                !sort ? 'bg-stone-800 text-white font-bold' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              Featured
            </Link>
            <Link
              href={`/collections/${slug}?sort=price-asc`}
              className={`px-2.5 py-1 rounded-lg ${
                sort === 'price-asc'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              Price: Low to High
            </Link>
            <Link
              href={`/collections/${slug}?sort=price-desc`}
              className={`px-2.5 py-1 rounded-lg ${
                sort === 'price-desc'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              Price: High to Low
            </Link>
            <Link
              href={`/collections/${slug}?sort=rating`}
              className={`px-2.5 py-1 rounded-lg ${
                sort === 'rating'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              Top Rated
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <p className="text-lg font-bold text-stone-800">No products found in this category.</p>
          <Link
            href="/collections/all"
            className="inline-block px-6 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] font-semibold text-xs uppercase"
          >
            Explore All Products
          </Link>
        </div>
      )}
    </div>
  );
}
