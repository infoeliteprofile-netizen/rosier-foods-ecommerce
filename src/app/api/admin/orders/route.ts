import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const orders = await prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ success: true, count: orders.length, orders });
    }
  } catch (e) {
    console.warn('DB orders query fallback', e);
  }

  // Fallback demo orders for initial exploration
  const demoOrders = [
    {
      id: 'ord_1',
      orderNumber: 'RF-892147',
      customerName: 'Sumit Suhag',
      email: 'sumit@example.com',
      phone: '+91 98112 34567',
      address: 'House 502, Sector 48, DLF Phase 4, Gurugram, Haryana - 122002',
      totalAmount: 2398.20,
      discountAmount: 260.00,
      discountCode: 'ROSIER10',
      status: 'DELIVERED',
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        { id: 'item_1', productName: 'A2 Ghee - Hand Churned Gir Cow Bilona Ghee', variantTitle: '1 Ltr', price: 1999, quantity: 1 },
        { id: 'item_2', productName: 'Khapli (Emmer) Wheat Atta', variantTitle: '2 Kg', price: 399.20, quantity: 1 }
      ]
    },
    {
      id: 'ord_2',
      orderNumber: 'RF-773410',
      customerName: 'Alisha A.',
      email: 'alisha@example.com',
      phone: '+91 99887 76543',
      address: 'Villa 12, Whitefield, Bengaluru, Karnataka - 560066',
      totalAmount: 591.20,
      discountAmount: 0,
      status: 'SHIPPED',
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      items: [
        { id: 'item_3', productName: 'Stone Pressed Black Mustard Oil', variantTitle: '1 Ltr', price: 312, quantity: 1 },
        { id: 'item_4', productName: 'Mango Pickle - Natural Sun Dried', variantTitle: '300g', price: 279.20, quantity: 1 }
      ]
    },
    {
      id: 'ord_3',
      orderNumber: 'RF-994120',
      customerName: 'Ramesh Sharma',
      email: 'ramesh@example.com',
      phone: '+91 98765 43210',
      address: 'Flat 3B, Vasant Vihar, New Delhi - 110057',
      totalAmount: 494.25,
      discountAmount: 50.00,
      discountCode: 'ROSIER10',
      status: 'PROCESSING',
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      createdAt: new Date().toISOString(),
      items: [
        { id: 'item_5', productName: 'Amlaprash (Chyawanprash)', variantTitle: '500g', price: 494.25, quantity: 1 }
      ]
    }
  ];

  return NextResponse.json({ success: true, count: demoOrders.length, orders: demoOrders });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status, paymentStatus } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Order ID and status required' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      const updated = await prisma.order.update({
        where: { id: orderId },
        data: {
          status,
          ...(paymentStatus ? { paymentStatus } : {}),
        },
      });
      return NextResponse.json({ success: true, order: updated });
    }

    return NextResponse.json({ success: true, message: `Order status updated to ${status}` });
  } catch (error: any) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
