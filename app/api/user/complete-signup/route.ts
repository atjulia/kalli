import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { auth } from '@/app/lib/auth';

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const data = await request.json();

  try {
    await db.collection('users').doc(session.user.id).update({
      name: data.name,
      phone: data.phone,
      cnpj: data.cnpj,
      businessType: data.businessType,
      workingHours: data.workingHours,
      signupCompleted: true,
      updatedAt: new Date()
    });

    return NextResponse.json(
      { message: 'Cadastro completado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao completar cadastro' },
      { status: 500 }
    );
  }
}