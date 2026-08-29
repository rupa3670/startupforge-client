import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  if (!session_id) throw new Error('Please provide a valid session_id')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  const { status, customer_details, metadata, amount_total } = session

  if (status === 'open') return redirect('/')

  if (status === 'complete') {
   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction_id: session_id,
        amount: (amount_total ?? 0) / 100,
        payment_status: status,
        founder_email: metadata?.founder_email,
      }),
    })

    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customer_details?.email}.
        </p>
      </section>
    )
  }
}