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
  promoPopup: {
    enabled: true,
    title: 'Pure Vedic Harvest Offer! 🌾',
    subtitle: 'Get 10% OFF on Certified A2 Bilona Ghee, Raw Honey & Stoneground Atta',
    couponCode: 'ROSIER10',
    imageUrl: 'https://www.rosierfoods.com/cdn/shop/files/diwali-hamper.png?v=1791490455&width=800',
    buttonText: 'Claim 10% OFF & Shop Now',
    targetUrl: '/collections/all',
    delaySeconds: 4,
    frequency: 'once_per_session',
  },
  paymentGateways: {
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
      instructions: 'Pay cash or UPI directly to the courier agent upon doorstep delivery.',
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
      publishableKey: '',
      secretKey: '',
    },
  },
  pages: {
    about: {
      pageTitle: 'Our Heritage & Soil-To-Soul Journey',
      subtitle: 'Preserving India’s Ancient Bilona Churning & Unhybridized Heirloom Crops',
      storyParagraph1: 'Founded on the sacred reverence for Indian indigenous cows and native seeds, Rosier Foods was born out of an urgent need to escape adulterated, ultra-processed supermarket staples.',
      storyParagraph2: 'We partner directly with multigenerational farming families across Rajasthan, Haryana, and Gujarat. No middlemen, no chemical preservatives, no deodorized oils.',
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
