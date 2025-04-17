import { db } from "@/app/lib/firebase";
import resend from "@/app/lib/resend";
import "server-only"
import Stripe from "stripe";

export async function handleStripePayment(event: Stripe.CheckoutSessionCompletedEvent) {
  if (event.data.object.payment_status === "paid") {
    const metadata = event.data.object.metadata
    const userEmail = event.data.object.customer_email
  
    const userId = metadata?.userId
  
    if (!userId) {
      console.error("User ID not found in metadata")
      return
    }
    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active"
    })

    const { data, error } = await resend.emails.send({
      from: 'Acme <me@atjulia.dev>',
      to: [userEmail!],
      subject: 'Pagamento realizado com sucesso',
      text: 'Pagemento realizado com sucesso!',
    })
    if (error) {
      console.error(error)
      return
    }
    console.log("Email sent successfully:", data)
  }
}