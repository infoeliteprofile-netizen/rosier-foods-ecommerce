# Rosier Foods - Full-Stack E-Commerce Platform

A production-grade, high-performance copy of [Rosier Foods](https://www.rosierfoods.com/) built with the latest **Next.js (App Router)**, **PostgreSQL (Prisma ORM)**, and **Tailwind CSS**, optimized for instant deployment on **Vercel**.

---

## 🌾 Features & Architecture

### 1. Authentic UI & Branding
- **Color Palette & Theme:** Earthy forest greens (`#1b4332`), golden honey amber (`#d4a373`), warm cream background (`#fdfbf7`), matching Rosier Foods' traditional Vedic heritage branding.
- **Top Promotional Marquee Ticker:** Dynamic discount banner (`ROSIER10` for 10% OFF) and free shipping progress.
- **Category Bubble Navigation:** Quick circular scroll strip for A2 Desi Ghee, Khapli Atta, Stone-Pressed Oils, Pickles, Healthy Breakfast, and Immunity Boosters.
- **Loved Across Generations (Best Sellers):** Product slider & grid with live interactive variant pills (e.g. 250 ML, 500 ML, 1 Ltr, Steel Dolchi), discount tags, star ratings, and instant add-to-cart.
- **Mid-Page Marquee Promotion:** Continuous ticker highlighting Vedic Ahimsa principles.
- **New Arrivals Section:** Winter delicacies like Gond Laddoos, freshly stone-milled Bajra and Multigrain Atta, and Banarasi Red Chilly Pickles.
- **Brand Story & Heritage:** *"जड़ों से जुड़े लोग, असली बदलाव"* highlighting farmer partnerships and Vedic cow care.
- **Customer Testimonials Slider:** Authentic reviews and athlete endorsements (e.g., Sumit Suhag).
- **Laboratory Transparency:** Direct links to NABL batch testing certificates.

### 2. Complete E-Commerce Capability
- **Cart Context & Slide-Over Drawer:** Real-time quantity adjustments, free shipping progress bar, promo code validation (`ROSIER10`), and subtotal calculations stored in `localStorage`.
- **Instant Search Modal:** Debounced product search with popular tag suggestions.
- **Interactive Product Detail Pages:** Thumbnail gallery, dynamic price updates upon changing variant/packaging, quantity counters, detailed tabbed accordions (Benefits, How It's Made, Ingredients, Lab Reports), and a customer review submission form.
- **Full Cart Page (`/cart`):** Detailed breakdown, coupon application, notes, and direct checkout link.
- **Express Checkout Flow (`/checkout`):** Multi-step form with customer details, delivery address, multiple payment options (Cash on Delivery, Instant UPI, and Cards), and order placement.
- **Order Success Page (`/order-success/[orderId]`):** Receipt breakdown, tracking status, and WhatsApp customer care assistance.

### 3. PostgreSQL Database & Vercel Readiness
- **Prisma Schema (`prisma/schema.prisma`):** Models for `Category`, `Product`, `ProductVariant`, `ProductImage`, `Order`, `OrderItem`, `Review`, `ContactMessage`, and `NewsletterSubscriber`.
- **Dual-Mode Data Layer (`src/lib/prisma.ts`):** Automatically connects to PostgreSQL when `DATABASE_URL` is set; safely falls back to the embedded static data if no database is connected yet, ensuring **zero downtime** during initial deployments.
- **Vercel Postgres / Neon / Supabase Compatible:** Ready out-of-the-box for serverless PostgreSQL.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. (Optional) Configure PostgreSQL Database
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your PostgreSQL connection string (from Vercel Postgres, Supabase, Neon, or local Postgres):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rosierfoods?sslmode=require"
```

Sync schema and seed data into PostgreSQL:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), import the repository.
3. Add a **Vercel Postgres** database from the *Storage* tab (or supply an external Postgres `DATABASE_URL` under Environment Variables).
4. Click **Deploy**. Vercel will automatically build the Next.js application and deploy it globally.
