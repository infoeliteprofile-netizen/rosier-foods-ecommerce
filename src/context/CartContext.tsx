'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ProductItem, ProductVariant } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductItem, variant?: ProductVariant, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  itemCount: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 499;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rosier_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('rosier_coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
        if (savedCoupon.toUpperCase() === 'ROSIER10') setDiscountPercent(10);
        if (savedCoupon.toUpperCase() === 'WELCOME15') setDiscountPercent(15);
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rosier_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const addToCart = (product: ProductItem, variant?: ProductVariant, quantity = 1) => {
    const selectedVariant = variant || product.variants[0] || {
      id: `${product.id}-default`,
      title: 'Standard',
      price: product.price,
      compareAtPrice: product.compareAtPrice,
    };

    const cartItemId = `${product.slug}-${selectedVariant.title.replace(/\s+/g, '-').toLowerCase()}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          productSlug: product.slug,
          name: product.name,
          variantTitle: selectedVariant.title,
          price: selectedVariant.price,
          compareAtPrice: selectedVariant.compareAtPrice,
          quantity,
          image: product.images[0] || '',
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
    localStorage.removeItem('rosier_cart');
    localStorage.removeItem('rosier_coupon');
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ROSIER10') {
      setCouponCode('ROSIER10');
      setDiscountPercent(10);
      localStorage.setItem('rosier_coupon', 'ROSIER10');
      return { success: true, message: '🎉 10% discount coupon applied!' };
    }
    if (clean === 'WELCOME15') {
      setCouponCode('WELCOME15');
      setDiscountPercent(15);
      localStorage.setItem('rosier_coupon', 'WELCOME15');
      return { success: true, message: '🎉 15% Welcome discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try ROSIER10' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    localStorage.removeItem('rosier_coupon');
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        itemCount,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        progressToFreeShipping,
        amountNeededForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
