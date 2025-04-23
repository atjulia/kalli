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

    const appointmentData = {
      appointmentId: crypto.randomUUID(),
      client: data.appointmentData.client,
      date: data.appointmentData.date,
      time: data.appointmentData.time,
      services: data.appointmentData.services,
      notes: data.appointmentData.notes,
      status: 'confirmed',
      createdAt: new Date()
    };

    await userRef
      .collection('appointments')
      .doc(appointmentData.appointmentId)
      .set(appointmentData);

    return NextResponse.json(
      { message: 'Agendamento criado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json(
      { message: 'Erro ao criar agendamento' },
      { status: 500 }
    );
  }
}
