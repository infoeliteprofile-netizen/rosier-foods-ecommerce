'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductItem, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  Share2,
  Heart
} from 'lucide-react';

interface ProductDetailViewProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: `${product.id}-default`,
      title: 'Standard',
      price: product.price,
      compareAtPrice: product.compareAtPrice,
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>('benefits');
  const [copiedLink, setCopiedLink] = useState(false);

  // New review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const discountPercentage = selectedVariant.compareAtPrice
    ? Math.round(
        ((selectedVariant.compareAtPrice - selectedVariant.price) /
          selectedVariant.compareAtPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? '' : name);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor,
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle || 'Verified Customer Review',
      comment: reviewComment,
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
    }, 2000);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div
            style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}
            className="aspect-square w-full rounded-3xl bg-[#fbf9f5] dark:bg-[#121e18] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm"
          >
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#1b4332] text-[#f7e6c4] shadow-md">
                {product.badge}
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-extrabold bg-[#d4a373] text-stone-950 shadow-md">
                {discountPercentage}% OFF
              </div>
            )}
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#fbf9f5] border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#1b4332] ring-2 ring-[#1b4332]/30 scale-105'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <Link
              href={`/collections/${product.categorySlug}`}
              className="text-xs uppercase font-bold tracking-[0.2em] text-[#1b4332] hover:underline"
            >
              {product.categoryName}
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating}</span>
            <span className="text-xs text-stone-400">({product.reviewCount} customer reviews)</span>
          </div>

          {/* Price */}
          <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-amber-200/60 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-950">
                ₹{selectedVariant.price.toFixed(2)}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-base text-stone-400 line-through">
                  ₹{selectedVariant.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                Save ₹{(selectedVariant.compareAtPrice! - selectedVariant.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Select Packaging / Weight: <span className="text-[#1b4332]">{selectedVariant.title}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border-2 transition-all ${
                      selectedVariant.id === v.id
                        ? 'border-[#1b4332] bg-[#1b4332] text-white shadow-sm'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div>{v.title}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">₹{v.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-stone-900 text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-xl bg-[#d4a373] text-stone-950 hover:bg-[#c39162] font-bold text-xs uppercase tracking-widest transition-all shadow-sm text-center"
            >
              Buy It Now • Instant Checkout
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>100% Vedic Vedic Bilona Pure</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>Free Delivery Over ₹499</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>Cash On Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>NABL Lab Tested Batch</span>
            </div>
          </div>

          {/* Share button */}
          <div className="pt-2">
            <button
              onClick={handleShare}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share this superfood with family'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accordions Section */}
      <div className="max-w-4xl mx-auto space-y-4 pt-4">
        {/* Accordion 1: Benefits */}
        <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleAccordion('benefits')}
            className="w-full p-5 text-left font-serif font-bold text-lg text-stone-900 flex items-center justify-between bg-[#fbf9f5]"
          >
            <span>Health Benefits &amp; Nutrition</span>
            {openAccordion === 'benefits' ? (
              <ChevronUp className="w-5 h-5 text-stone-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone-500" />
            )}
          </button>
          {openAccordion === 'benefits' && (
            <div className="p-6 space-y-4 text-sm text-stone-700 leading-relaxed border-t border-stone-100">
              <p>{product.description}</p>
              {product.benefits.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1b4332] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: How It's Made */}
        {product.howItsMade && (
          <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">
            <button
              onClick={() => toggleAccordion('howItsMade')}
              className="w-full p-5 text-left font-serif font-bold text-lg text-stone-900 flex items-center justify-between bg-[#fbf9f5]"
            >
              <span>The Traditional Process: How It&apos;s Made</span>
              {openAccordion === 'howItsMade' ? (
                <ChevronUp className="w-5 h-5 text-stone-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-stone-500" />
              )}
            </button>
            {openAccordion === 'howItsMade' && (
              <div className="p-6 text-sm text-stone-700 leading-relaxed border-t border-stone-100">
                <p>{product.howItsMade}</p>
              </div>
            )}
          </div>
        )}

        {/* Accordion 3: Ingredients & Nutritional Info */}
        <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleAccordion('ingredients')}
            className="w-full p-5 text-left font-serif font-bold text-lg text-stone-900 flex items-center justify-between bg-[#fbf9f5]"
          >
            <span>Ingredients &amp; Nutritional Facts</span>
            {openAccordion === 'ingredients' ? (
              <ChevronUp className="w-5 h-5 text-stone-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone-500" />
            )}
          </button>
          {openAccordion === 'ingredients' && (
            <div className="p-6 space-y-4 text-sm text-stone-700 border-t border-stone-100">
              {product.ingredients && (
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Pure Ingredients:</h4>
                  <p>{product.ingredients}</p>
                </div>
              )}
              {product.nutritionalFacts && (
                <div className="pt-2">
                  <h4 className="font-bold text-stone-900 mb-2">Nutritional Values (Approx):</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(product.nutritionalFacts).map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                        <span className="block text-[11px] text-stone-500">{k}</span>
                        <span className="font-bold text-stone-900 text-xs">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Accordion 4: Lab Report */}
        {product.labReport && (
          <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">
            <button
              onClick={() => toggleAccordion('labReport')}
              className="w-full p-5 text-left font-serif font-bold text-lg text-stone-900 flex items-center justify-between bg-[#fbf9f5]"
            >
              <span>Laboratory Verification &amp; Purity Certification</span>
              {openAccordion === 'labReport' ? (
                <ChevronUp className="w-5 h-5 text-stone-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-stone-500" />
              )}
            </button>
            {openAccordion === 'labReport' && (
              <div className="p-6 space-y-3 text-sm text-stone-700 border-t border-stone-100">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs text-stone-500 font-medium">Batch Number:</span>
                  <span className="font-mono text-xs font-bold text-stone-900">{product.labReport.batchNumber}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs text-stone-500 font-medium">FSSAI License:</span>
                  <span className="font-mono text-xs font-bold text-stone-900">{product.labReport.fssaiLicense}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-medium block mb-1">Tested Parameters:</span>
                  <ul className="list-disc list-inside text-xs space-y-1 text-stone-600">
                    {product.labReport.testedParameters.map((param, i) => (
                      <li key={i}>{param}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <Link
                    href="/pages/lab-test-reports"
                    className="text-xs font-bold text-[#1b4332] hover:underline flex items-center gap-1"
                  >
                    View All Official Lab Test Certificates →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Customer Reviews</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Genuine experiences from real households across India.
            </p>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 rounded-xl bg-[#1b4332] text-[#f7e6c4] hover:bg-[#123124] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            {showReviewForm ? 'Cancel Review' : 'Write A Review'}
          </button>
        </div>

        {/* Review Form Drawer/Box */}
        {showReviewForm && (
          <form
            onSubmit={handleAddReview}
            className="mb-8 p-6 rounded-2xl bg-[#fbf9f5] border border-stone-200 space-y-4 animate-in fade-in duration-200"
          >
            <h4 className="font-bold text-stone-900 text-sm">Write Your Review</h4>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                ✓ Thank you! Your review has been recorded.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#1b4332] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#1b4332] bg-white"
                    >
                      <option value="5">5 Stars - Outstanding Quality</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Below Expectation</option>
                      <option value="1">1 Star - Unsatisfied</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Purest ghee with heavenly aroma"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#1b4332] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Feedback</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell other buyers about the aroma, taste, texture, and packaging..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#1b4332] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123124]"
                >
                  Submit Review
                </button>
              </>
            )}
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.length > 0 ? (
            reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400">{rev.date}</span>
                </div>

                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                {rev.title && (
                  <h5 className="font-semibold text-stone-900 text-sm">{rev.title}</h5>
                )}

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-stone-500 text-sm">
              Be the first to review this traditional superfood!
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1b4332]">
              You May Also Like
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Pairs Well With Your Healthy Kitchen
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
