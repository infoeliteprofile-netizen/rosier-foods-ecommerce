import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const DEFAULT_SITE_SETTINGS = {
  theme: {
    primaryColor: '#1b4332',
    primaryHover: '#143225',
    accentColor: '#d4a373',
    defaultMode: 'light',
  },
  announcement: {
    enabled: true,
    text: 'SALE ENDING TONIGHT: USE CODE ROSIER10 FOR 10% OFF',
    couponCode: 'ROSIER10',
    freeShippingText: 'Free Shipping Over ₹499',
  },
  hero: {
    badge: '100% Vedic Bilona • Zero Chemicals',
    headline: 'Pure, Traditional Foods Delivered Across India',
    subheadline: 'Hand-churned A2 Gir Cow Ghee, stoneground unhybridized Khapli Atta, and cold-pressed Kolhu oils—crafted with ancient wisdom for modern vitality.',
    ctaText: 'Shop Pure Foods',
    ctaLink: '/collections/all',
    featuredProductBadge: '🔥 Most Loved',
    featuredProductTitle: 'Hand Churned Vedic Bilona Ghee',
    featuredProductPrice: '₹559.00',
    featuredProductComparePrice: '₹699.00',
    featuredProductImage: 'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-1261568460.webp?v=1791458799&width=800',
  },
  marquee: {
    items: [
      'FOODS THAT HEAL, NOT HYPE',
      'PURE | TRADITIONAL | ETHICALLY CRAFTED',
      '100% VEDIC BILONA GHEE',
      'ZERO PRESERVATIVES OR ADDITIVES',
      'STONEGROUND ANCIENT GRAINS',
      'DIRECT RELATIONSHIP WITH FARMERS',
    ],
  },
  heritage: {
    subheading: 'More Than A Brand, A Family',
    hindiHeadline: 'जड़ों से जुड़े लोग, असली बदलाव',
    description: 'At Rosier Foods, we believe true nourishment begins at the source. We partner directly with multigenerational farming families who cultivate indigenous heritage seeds, nurse native Gir cows with kindness, and preserve India’s ancient culinary wisdom.',
    stats: [
      { number: '5,000+', label: 'Indigenous Gir Cows' },
      { number: '45+', label: 'Farming Families' },
      { number: '150k+', label: 'Homes Nourished' },
      { number: '100%', label: 'Pure & Traceable' },
    ],
  },
  contact: {
    phone: '+91 99999 87654',
    email: 'care@rosierfoods.com',
    address: 'Sector 48, Sohna Road, Gurugram, Haryana - 122018, India',
    supportHours: 'Monday - Saturday, 9:00 AM - 7:00 PM IST',
  },
};

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const setting = await prisma.siteSetting.findUnique({
        where: { key: 'siteSettings' },
      });
      if (setting && setting.value) {
        return NextResponse.json({ success: true, settings: JSON.parse(setting.value) });
      }
    }
  } catch (e) {
    console.warn('Could not read settings from DB, using defaults', e);
  }

  return NextResponse.json({ success: true, settings: DEFAULT_SITE_SETTINGS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (process.env.DATABASE_URL) {
      await prisma.siteSetting.upsert({
        where: { key: 'siteSettings' },
        update: { value: JSON.stringify(body) },
        create: { key: 'siteSettings', value: JSON.stringify(body) },
      });
    }

    return NextResponse.json({ success: true, message: 'Settings saved successfully', settings: body });
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
