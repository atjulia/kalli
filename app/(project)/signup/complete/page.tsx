import { Card } from '@/app/components/ui/card';
import { auth } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import { CompleteSignupForm } from '@/app/components/complete-signup-form';

export default async function CompleteSignupPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (session?.user.signupCompleted) {
    redirect('/dashboard');
  }

  const businessTypes = [
    "Cabeleireiro",
    "Barbeiro",
    "Esteticista",
    "Massoterapeuta",
    "Personal Trainer",
    "Nutricionista", 
    "Dentista",
    "Tatuador",
    "Designer de Sobrancelhas",
    "Manicure/Pedicure",
    "Outro"
  ];

  const defaultWorkingHours = {
    monday: { slots: [], available: true },
    tuesday: { slots: [], available: true },
    wednesday: { slots: [], available: true },
    thursday: { slots: [], available: true },
    friday: { slots: [], available: true },
    saturday: { slots: [], available: false },
    sunday: {  slots: [], available: false },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Complete seu cadastro
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Precisamos de algumas informações adicionais
          </p>
        </div>

        <Card className="border-0 shadow-lg p-6">
          <CompleteSignupForm 
            initialData={{
              name: '',
              email: '',
              phone: '',
              businessType: '',
              timezone: 'America/Sao_Paulo',
              workingHours: defaultWorkingHours,
              appointmentSettings: {
                bufferTime: 10,
                cancellationPolicy: "Cancelar com no mínimo 24h de antecedência."
              }
            }}
            businessTypes={businessTypes}
          />
        </Card>
      </div>
    </div>
  );
}
