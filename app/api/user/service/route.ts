import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const userRef = db.collection('users').doc(data.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    const currentServices = userDoc.data()?.services || [];

    if (!data.isEdit) {
      const newService = {
        serviceId: crypto.randomUUID(),
        name: data.serviceData.name,
        description: data.serviceData.description,
        duration: data.serviceData.duration,
        price: data.serviceData.price,
      };

      await userRef.update({
        services: [...currentServices, newService],
        updatedAt: new Date(),
      });
    } else {
      const updatedService = {
        serviceId: data.serviceData.serviceId,
        name: data.serviceData.name,
        description: data.serviceData.description,
        duration: data.serviceData.duration,
        price: data.serviceData.price,
      };

      const updatedServices = currentServices.map((s: any) =>
        s.serviceId === updatedService.serviceId ? updatedService : s
      );

      await userRef.update({
        services: updatedServices,
        updatedAt: new Date(),
      });
    }

    return NextResponse.json(
      { message: 'Serviço salvo com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao salvar serviço' },
      { status: 500 }
    );
  }
}
