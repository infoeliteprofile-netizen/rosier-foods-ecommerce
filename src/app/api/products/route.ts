import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q')?.toLowerCase() || undefined;

    let products = await getProducts(category);

    if (query) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error('API products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}
