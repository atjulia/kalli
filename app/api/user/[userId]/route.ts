import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params?.userId;

  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const userDocRef = db.collection('users').doc(userId);
    const userDocSnap = await userDocRef.get();

    if (!userDocSnap.exists) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      user: userDocSnap.data()
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao buscar dados do usuário' },
      { status: 500 }
    );
  }
}
