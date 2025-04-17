import resend from "@/app/lib/resend"
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes"

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata
  const userEmail = metadata.user_email
  const testeId = metadata.teste_id
  console.log("Payment data: ", { userEmail, testeId, paymentData })
  
  const { data, error } = await resend.emails.send({
    from: 'Acme <me@atjulia.dev>',
    to: [userEmail!],
    subject: 'Pagamento realizada com sucesso',
    text: 'Pagamento realizada com sucesso!',
  })
  if (error) {
    console.error(error)
    return
  }
  console.log("Email sent successfully:", data)
}