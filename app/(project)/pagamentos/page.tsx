"use client"

import { useStripe } from "@/app/hooks/useStripe"

export default function Pagamentos() {
  const { createPaymentStripeCheckout, createSubscriptionStripeCheckout, handleCreateStripePortal } = useStripe()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl font-bold">Pagamentos</h1>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => createPaymentStripeCheckout({ customerId: 'abc', userEmail: 'teste@ex.com' })}>Criar pagamento stripe</button>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => createSubscriptionStripeCheckout({
        testeId: "123"
      })}>Criar assinatura stripe</button>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => handleCreateStripePortal()}>Criar portal de pagamentos</button>
    </div>
  )
}