import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/prisma';
import ProductDetailView from '@/components/ProductDetailView';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Rosier Foods',
    };
  }

  return {
    title: `${product.name} | Rosier Foods`,
    description: product.tagline || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Rosier Foods`,
      description: product.tagline,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
