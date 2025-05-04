import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { handleAuth } from "@/app/actions/handle-auth"
import Link from "next/link";
import { Calendar, Clock, User, Phone, Settings, FileText, Plus, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { createUpdateUserService, getUser } from "@/app/actions/handle-user";
import { AvailabilitySchedule } from "@/app/components/available-appointments";
import { ServiceModal } from "@/app/components/service-modal";
import { Service } from "@/app/types/service";
import { getUserAppointments } from "@/app/actions/handle-appointments";
import { UpcomingAppointments } from "@/app/components/upcoming-appointments";

export default async function Dashboard() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

  const user = await getUser(session.user?.id!);
  const upcomingAppointments = await getUserAppointments(session.user?.id!, user.services);
  const appointmentTodayLength = await upcomingAppointments.filter((p: { date: Date; }) => p.date === new Date).length
  
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalFaturamento = upcomingAppointments
    .filter((app: { date: string | number | Date; }) => {
      const date = new Date(app.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .flatMap((app: { services: any; }) => app.services)
    .reduce((sum: number, service: { price: string; }) => {
      const number = parseFloat(service.price.replace("R$ ", "").replace(".", "").replace(",", "."));
      return sum + number;
    }, 0);
  const formattedTotal = totalFaturamento.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const handleSaveService = async (service: any, isEdit: boolean) => {
    "use server"

    await createUpdateUserService(service, user.userId, isEdit);
    redirect("/dashboard");
  };

	 return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Agendamentos hoje</p>
                  <p className="text-2xl font-bold">{appointmentTodayLength}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Faturamento mensal</p>
                  <p className="text-2xl font-bold">{formattedTotal}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meus Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                { user.services.map((service: Service) => (
                  <div key={service.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration} • {service.price}</p>
                    </div>
                    <ServiceModal 
                      service={service} 
                      onSave={handleSaveService}
                    >
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </ServiceModal>
                  </div>
                ))}
                <ServiceModal onSave={handleSaveService}>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar serviço
                  </Button>
                </ServiceModal>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
            </div>

            <Tabs defaultValue="agendados">
              <TabsList className="grid grid-cols-2 w-full md:w-auto">
                <TabsTrigger value="agendados">Agendados</TabsTrigger>
                <TabsTrigger value="disponiveis">Horários Disponíveis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="agendados" className="mt-6">
                <UpcomingAppointments appointments={upcomingAppointments} user={user} />
              </TabsContent>
              
              <TabsContent value="disponiveis" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Horários Disponíveis</CardTitle>
                    <CardDescription>Configure seus horários de atendimento</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <AvailabilitySchedule 
                    workingHours={user.workingHours} 
                    services={user.services}
                    userId={user.userId}
                    appointments={upcomingAppointments}
                  />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
