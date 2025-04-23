import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
// import { auth } from '@/app/lib/auth';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  // }

  const data = await request.json();

  try {
    const newService = {
      serviceId: crypto.randomUUID(),
      name: data.serviceData.name,
      description: data.serviceData.description,
      duration: data.serviceData.duration,
      price: data.serviceData.price,
    };

    await db.collection('users').doc(data.userId).update({
      services: FieldValue.arrayUnion(newService),
      updatedAt: new Date()
    });

    return NextResponse.json(
      { message: 'Serviço adicionado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao adicionar serviço' },
      { status: 500 }
    );
  }
}
