export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  stock?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  discountBadge?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  categorySlug: string;
  categoryName: string;
  inStock: boolean;
  featured: boolean;
  isNewArrival: boolean;
  images: string[];
  variants: ProductVariant[];
  benefits: string[];
  ingredients?: string;
  howItsMade?: string;
  nutritionalFacts?: { [key: string]: string };
  labReport?: {
    batchNumber: string;
    fssaiLicense: string;
    testedParameters: string[];
    reportUrl?: string;
  };
  reviews: ReviewItem[];
}

export interface CategoryItem {
  id?: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  image: string;
  icon?: string;
}

export interface CartItem {
  id: string; // product-slug + variant-title
  productId: string;
  productSlug: string;
  name: string;
  variantTitle: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image: string;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode?: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}
