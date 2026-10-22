import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CATEGORIES } from '@/data/rosier-data';

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const dbCategories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
      });
      if (dbCategories && dbCategories.length > 0) {
        return NextResponse.json({ success: true, categories: dbCategories });
      }
    }
  } catch (e) {
    console.warn('DB categories query fallback', e);
  }

  return NextResponse.json({ success: true, categories: CATEGORIES });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (process.env.DATABASE_URL) {
      const category = await prisma.category.upsert({
        where: { slug },
        update: {
          name: body.name,
          description: body.description || '',
          image: body.image || '',
        },
        create: {
          slug,
          name: body.name,
          description: body.description || '',
          image: body.image || '',
        },
      });
      return NextResponse.json({ success: true, message: 'Category saved to PostgreSQL', category });
    }

    const existingIdx = CATEGORIES.findIndex((c) => c.slug === slug);
    const updated = {
      slug,
      name: body.name,
      description: body.description || '',
      image: body.image || 'https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800',
      icon: body.icon || '🌾',
    };

    if (existingIdx !== -1) {
      CATEGORIES[existingIdx] = updated;
    } else {
      CATEGORIES.push(updated);
    }

    return NextResponse.json({ success: true, message: 'Category updated', category: updated });
  } catch (error: any) {
    console.error('Error saving category:', error);
    return NextResponse.json({ error: 'Failed to save category' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Category slug required' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      await prisma.category.delete({ where: { slug } });
    }

    const idx = CATEGORIES.findIndex((c) => c.slug === slug);
    if (idx !== -1) {
      CATEGORIES.splice(idx, 1);
    }

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
