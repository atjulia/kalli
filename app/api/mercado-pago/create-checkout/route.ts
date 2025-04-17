import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json()

  try {
    const preference = new Preference(mpClient)

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId,
        items: [
          {
            id: "1234",
            title: "Teste de Produto",
            description: "Descrição do produto",
            quantity: 1,
            unit_price: 10,
            currency_id: "BRL",
            category_id: "services",
          }
        ],
        payment_methods: {
          installments: 12
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/api/mercado-pago/pending`,
          failure: `${req.headers.get("origin")}/api/mercado-pago/pending`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`,
        },
        ...(userEmail && { payer: { email: userEmail } }),
        metadata: {
          testeId,
          userEmail
        }
      }
    })

    if (!createdPreference.id) {
      return NextResponse.json({ error: "Preference ID not found" }, { status: 500 })
    }

    return NextResponse.json({ preferenceId: createdPreference.id, init_point: createdPreference.init_point }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json("Internal Server Error", { status: 500 })
  }
}