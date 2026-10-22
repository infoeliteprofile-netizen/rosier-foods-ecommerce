import { PrismaClient } from '@prisma/client';
import { CATEGORIES, PRODUCTS } from '../src/data/rosier-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Rosier Foods database in PostgreSQL...');

  // 1. Seed Categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        image: cat.image,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image: cat.image,
      },
    });
  }
  console.log(`Seeded ${CATEGORIES.length} categories.`);

  // 2. Seed Products
  for (const prod of PRODUCTS) {
    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });

    if (existing) {
      await prisma.product.delete({ where: { id: existing.id } });
    }

    await prisma.product.create({
      data: {
        slug: prod.slug,
        name: prod.name,
        tagline: prod.tagline,
        description: prod.description,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        discountBadge: prod.discountBadge,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        badge: prod.badge,
        categorySlug: prod.categorySlug,
        inStock: prod.inStock,
        featured: prod.featured,
        isNewArrival: prod.isNewArrival,
        benefits: JSON.stringify(prod.benefits),
        ingredients: prod.ingredients,
        howItsMade: prod.howItsMade,
        labTestReport: prod.labReport?.reportUrl,
        images: {
          create: prod.images.map((url, idx) => ({
            url,
            order: idx,
          })),
        },
        variants: {
          create: prod.variants.map((v) => ({
            title: v.title,
            price: v.price,
            compareAtPrice: v.compareAtPrice,
            stock: v.stock || 100,
          })),
        },
        reviews: {
          create: prod.reviews.map((r) => ({
            author: r.author,
            rating: r.rating,
            title: r.title,
            comment: r.comment,
            verified: r.verified,
          })),
        },
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products with variants and reviews.`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
