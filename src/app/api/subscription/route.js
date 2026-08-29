import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const { founderEmail } = await req.json()

    const PRICE_ID = "price_1U917VAS6BEMSlklGowAvPTo"

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: { founder_email: founderEmail },
      success_url: `${origin}/dashboard/founder/add-opportunities/pricing/success-subscription?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url })   
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}