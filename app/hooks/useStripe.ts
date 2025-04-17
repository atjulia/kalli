import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { NextResponse } from "next/server";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createPaymentStripeCheckout(checkoutData: {
    customerId: string,
    userEmail: string
  }) {
    if (!stripe) return

    try {
      const response = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData)
      })
  
      if (!response.ok) {
        const error = await response.json()
        console.error(error)
        return
      }
  
      const data = await response.json()

      return NextResponse.json({ sessionId: data.id }, { status: 200 })
    } catch (error) {
      console.error(error)
    }
  }

  async function createSubscriptionStripeCheckout(checkoutData: {
    testeId: string
  }) {
    if (!stripe) return

    try {
      const response = await fetch("/api/stripe/create-subscription-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData)
      })

      const data = await response.json()

      await stripe.redirectToCheckout({ sessionId: data.id })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateStripePortal() {
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    window.location.href = data.url
  }
  return {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal
  }
}
