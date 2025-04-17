import { NextRequest, NextResponse } from "next/server";
import { Payment, Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const paymentId = searchParams.get("payment_id")

  const testeId = searchParams.get("external_reference")

  if(!paymentId || !testeId) {
    return NextResponse.json("Bad Request", { status: 400 })
  }

  const payment = await new Payment(mpClient)

  const paymentData = await payment.get({
    id: paymentId,
  })

  if (paymentData.status == "approved" || paymentData.date_approved !== null) {
    return NextResponse.redirect(new URL(`/success`, req.url))
  }
  return NextResponse.redirect(new URL(`/`, req.url))
}