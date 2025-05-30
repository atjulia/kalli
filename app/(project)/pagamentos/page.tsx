"use client"

import { useStripe } from "@/app/hooks/useStripe"
import { useMercadoPago } from "@/app/hooks/useMercadoPago"

export default function Pagamentos() {
  const { createPaymentStripeCheckout, createSubscriptionStripeCheckout, handleCreateStripePortal } = useStripe()
  const { createMercadoPagoCheckout } = useMercadoPago()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl font-bold">Pagamentos</h1>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => createPaymentStripeCheckout({ customerId: 'abc', userEmail: 'teste@ex.com' })}>Criar pagamento stripe</button>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => createSubscriptionStripeCheckout({
        testeId: "123"
      })}>Criar assinatura stripe</button>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => handleCreateStripePortal()}>Criar portal de pagamentos</button>
      <button className="border rounded-md px-1 cursor-pointer" onClick={() => createMercadoPagoCheckout({ testeId: "123", userEmail: "teste@teste.con"})}>Criar portal de pagamentos Mercado Pago</button>
    </div>
  )
}