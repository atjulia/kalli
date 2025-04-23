import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { handleAuth } from "@/app/actions/handle-auth"
import Link from "next/link";
import { Calendar, Clock, User, Settings, Plus, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { createUpdateUserService, getUser } from "@/app/actions/handle-user";
import { AvailabilitySchedule } from "@/app/components/available-appointments";
import { ServiceModal } from "@/app/components/service-modal";

interface Service {
  serviceId: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export default async function Dashboard() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

  const user = await getUser(session.user.id!);
  console.log("User:", user)

  const upcomingAppointments = [
    { id: 1, client: 'Ana Silva', service: 'Corte de Cabelo', date: '2023-11-15', time: '14:00', status: 'confirmado' },
    { id: 2, client: 'Carlos Oliveira', service: 'Manicure', date: '2023-11-16', time: '10:30', status: 'confirmado' },
    { id: 3, client: 'Mariana Costa', service: 'Massagem', date: '2023-11-17', time: '16:00', status: 'pendente' }
  ];

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
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Faturamento mensal</p>
                  <p className="text-2xl font-bold">R$ 2.450,00</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meus Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                { user.services.map((service: Service) => (
                  <div key={service.serviceId} className="flex justify-between items-center">
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
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Próximos Agendamentos</CardTitle>
                        <CardDescription>Visualize e gerencie seus compromissos</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Hoje
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map(appointment => (
                        <div key={appointment.id} className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{appointment.service}</p>
                              <Badge variant={appointment.status === 'confirmado' ? 'default' : 'secondary'}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              <User className="inline w-4 h-4 mr-1" />
                              {appointment.client}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              <Clock className="inline w-4 h-4 mr-1" />
                              {appointment.date} • {appointment.time}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
