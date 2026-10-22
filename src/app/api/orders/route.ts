import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.email || !body.phone || !body.address || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order fields.' },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city || 'India',
      state: body.state || 'Haryana',
      postalCode: body.postalCode || '110001',
      items: body.items,
      totalAmount: Number(body.totalAmount) || 0,
      discountAmount: Number(body.discountAmount) || 0,
      discountCode: body.discountCode,
      paymentMethod: body.paymentMethod || 'COD',
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing order.' },
      { status: 500 }
    );
  }
}
