import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
  const rawBody = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
  }

    const event = stripe.webhooks.constructEvent(rawBody, signature, secret)
    
  switch (event.type) {
    case "checkout.session.completed":
      const metadata = event.data.object.metadata

      if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
        await handleStripePayment(event)
      }
      if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
        await handleStripeSubscription(event)
      }
      break
    case "customer.subscription.deleted":
      await handleStripeCancelSubscription(event)
      break
    case "checkout.session.expired":
      console.log("Checkout session expired")
      break
    case "checkout.session.async_payment_succeeded":
      console.log("Payment succeeded")
      break
    case "checkout.session.async_payment_failed":
      console.log("Payment failed")
      break  
    case "customer.subscription.created":
      console.log("Subscription created") 
      break
    case "customer.subscription.updated":
      console.log("Subscription updated")
      break
    case "customer.subscription.deleted":
      console.log("Subscription deleted")
      break
  }

  return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

}