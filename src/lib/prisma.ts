import { PrismaClient } from '@prisma/client';
import { PRODUCTS, CATEGORIES } from '@/data/rosier-data';
import { ProductItem, OrderData, CartItem } from '@/types';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Safe Database Access Layer with Fallback to rich dataset
export async function getProducts(categorySlug?: string): Promise<ProductItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        where: categorySlug && categorySlug !== 'all' ? { categorySlug } : undefined,
        include: {
          images: { orderBy: { order: 'asc' } },
          variants: true,
          reviews: true,
          category: true,
        },
      });

      if (dbProducts && dbProducts.length > 0) {
        return dbProducts.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          tagline: p.tagline || '',
          description: p.description,
          price: p.price,
          compareAtPrice: p.compareAtPrice || undefined,
          discountBadge: p.discountBadge || undefined,
          rating: p.rating,
          reviewCount: p.reviewCount,
          badge: p.badge || undefined,
          categorySlug: p.categorySlug,
          categoryName: p.category?.name || 'Rosier Foods',
          inStock: p.inStock,
          featured: p.featured,
          isNewArrival: p.isNewArrival,
          images: p.images.map((img: any) => img.url),
          variants: p.variants.map((v: any) => ({
            id: v.id,
            title: v.title,
            price: v.price,
            compareAtPrice: v.compareAtPrice || undefined,
            stock: v.stock,
          })),
          benefits: p.benefits ? JSON.parse(p.benefits) : [],
          ingredients: p.ingredients || undefined,
          howItsMade: p.howItsMade || undefined,
          reviews: p.reviews.map((r: any) => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            date: r.createdAt.toLocaleDateString(),
            title: r.title || 'Great Product',
            comment: r.comment,
            verified: r.verified,
          })),
        }));
      }
    }
  } catch (error) {
    console.warn('PostgreSQL database query fallback to static data:', error);
  }

  // Fallback to static rich data
  if (categorySlug && categorySlug !== 'all') {
    return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
  }
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    if (process.env.DATABASE_URL) {
      const p: any = await prisma.product.findUnique({
        where: { slug },
        include: {
          images: { orderBy: { order: 'asc' } },
          variants: true,
          reviews: true,
          category: true,
        },
      });

      if (p) {
        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          tagline: p.tagline || '',
          description: p.description,
          price: p.price,
          compareAtPrice: p.compareAtPrice || undefined,
          discountBadge: p.discountBadge || undefined,
          rating: p.rating,
          reviewCount: p.reviewCount,
          badge: p.badge || undefined,
          categorySlug: p.categorySlug,
          categoryName: p.category?.name || 'Rosier Foods',
          inStock: p.inStock,
          featured: p.featured,
          isNewArrival: p.isNewArrival,
          images: p.images.map((img: any) => img.url),
          variants: p.variants.map((v: any) => ({
            id: v.id,
            title: v.title,
            price: v.price,
            compareAtPrice: v.compareAtPrice || undefined,
            stock: v.stock,
          })),
          benefits: p.benefits ? JSON.parse(p.benefits) : [],
          ingredients: p.ingredients || undefined,
          howItsMade: p.howItsMade || undefined,
          reviews: p.reviews.map((r: any) => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            date: r.createdAt.toLocaleDateString(),
            title: r.title || 'Great Product',
            comment: r.comment,
            verified: r.verified,
          })),
        };
      }
    }
  } catch (error) {
    console.warn('PostgreSQL database getProductBySlug fallback:', error);
  }

  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export async function createOrder(data: {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  discountCode?: string;
  paymentMethod: string;
}): Promise<OrderData> {
  const orderNumber = `RF-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  try {
    if (process.env.DATABASE_URL) {
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          totalAmount: data.totalAmount,
          discountAmount: data.discountAmount,
          discountCode: data.discountCode,
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
          status: 'PROCESSING',
          items: {
            create: data.items.map((item) => ({
              productName: item.name,
              variantTitle: item.variantTitle,
              price: item.price,
              quantity: item.quantity,
              imageUrl: item.image,
            })),
          },
        },
        include: { items: true },
      });

      return {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        state: order.state,
        postalCode: order.postalCode,
        country: order.country,
        items: data.items,
        subtotal: data.totalAmount + data.discountAmount,
        discount: data.discountAmount,
        shipping: data.totalAmount >= 499 ? 0 : 50,
        total: data.totalAmount,
        discountCode: order.discountCode || undefined,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
      };
    }
  } catch (error) {
    console.warn('PostgreSQL order creation fallback:', error);
  }

  // Fallback memory order response
  return {
    id: `ord_${Date.now()}`,
    orderNumber,
    customerName: data.customerName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    postalCode: data.postalCode,
    country: 'India',
    items: data.items,
    subtotal: data.totalAmount + data.discountAmount,
    discount: data.discountAmount,
    shipping: data.totalAmount >= 499 ? 0 : 50,
    total: data.totalAmount,
    discountCode: data.discountCode,
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
    status: 'PROCESSING',
    createdAt: new Date().toISOString(),
  };
}
