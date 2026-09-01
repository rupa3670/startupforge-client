import AutoRedirect from '@/components/opportunities/AutoRedirect'
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
      <section id="success" className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          We appreciate your business! A confirmation email will be sent to{' '}
          {customer_details?.email}.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting you to Add Opportunity in a moment...
        </p>
        <AutoRedirect to="/dashboard/founder/add-opportunities" delay={2000} />
      </section>
    )
  }
}