import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = await context.params;

  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const appointmentsRef = db.collection('users').doc(userId).collection('appointments');
    const snapshot = await appointmentsRef.get();

    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}