import { NextRequest, NextResponse } from 'next/server';
import { prisma, getProducts } from '@/lib/prisma';
import { PRODUCTS } from '@/data/rosier-data';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ success: true, count: products.length, products });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.price || !body.categorySlug) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (process.env.DATABASE_URL) {
      const product = await prisma.product.upsert({
        where: { slug },
        update: {
          name: body.name,
          tagline: body.tagline || '',
          description: body.description || '',
          price: Number(body.price),
          compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
          badge: body.badge || null,
          categorySlug: body.categorySlug,
          inStock: body.inStock !== false,
          featured: Boolean(body.featured),
          isNewArrival: Boolean(body.isNewArrival),
          benefits: JSON.stringify(body.benefits || []),
          ingredients: body.ingredients || '',
        },
        create: {
          slug,
          name: body.name,
          tagline: body.tagline || '',
          description: body.description || '',
          price: Number(body.price),
          compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
          badge: body.badge || null,
          categorySlug: body.categorySlug,
          inStock: body.inStock !== false,
          featured: Boolean(body.featured),
          isNewArrival: Boolean(body.isNewArrival),
          benefits: JSON.stringify(body.benefits || []),
          ingredients: body.ingredients || '',
          images: {
            create: (body.images || ['https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800']).map((url: string, idx: number) => ({
              url,
              order: idx,
            })),
          },
          variants: {
            create: (body.variants || [{ title: 'Standard', price: Number(body.price), compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null }]).map((v: any) => ({
              title: v.title,
              price: Number(v.price),
              compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
            })),
          },
        },
      });

      return NextResponse.json({ success: true, message: 'Product saved to PostgreSQL', product });
    }

    // In-memory update for fallback mode
    const existingIndex = PRODUCTS.findIndex((p) => p.slug === slug || p.id === body.id);
    const updatedItem = {
      id: body.id || `prod-${Date.now()}`,
      slug,
      name: body.name,
      tagline: body.tagline || '',
      description: body.description || '',
      price: Number(body.price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      discountBadge: body.discountBadge || undefined,
      rating: Number(body.rating) || 4.9,
      reviewCount: Number(body.reviewCount) || 50,
      badge: body.badge || undefined,
      categorySlug: body.categorySlug,
      categoryName: body.categoryName || 'Rosier Foods',
      inStock: body.inStock !== false,
      featured: Boolean(body.featured),
      isNewArrival: Boolean(body.isNewArrival),
      images: body.images || ['https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800'],
      variants: body.variants || [{ id: 'v1', title: 'Standard', price: Number(body.price) }],
      benefits: body.benefits || [],
      ingredients: body.ingredients || '',
      reviews: [],
    };

    if (existingIndex !== -1) {
      PRODUCTS[existingIndex] = updatedItem;
    } else {
      PRODUCTS.unshift(updatedItem);
    }

    return NextResponse.json({ success: true, message: 'Product updated successfully', product: updatedItem });
  } catch (error: any) {
    console.error('Save product error:', error);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (!id && !slug) {
      return NextResponse.json({ error: 'Product id or slug required' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      await prisma.product.deleteMany({
        where: id ? { id } : { slug: slug! },
      });
    }

    const idx = PRODUCTS.findIndex((p) => p.id === id || p.slug === slug);
    if (idx !== -1) {
      PRODUCTS.splice(idx, 1);
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
