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

export default async function Dashboard() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

  const user = await getUser(session.user?.id!);
  const upcomingAppointments = await getUserAppointments(session.user?.id!, user.services);
  console.log("User:", user)

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
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment: any) => {
                        const formattedDate = new Date(appointment.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        });
                        
                        const serviceNames = appointment.services.map((service: any) => 
                          user.services.find((s: any) => s.id === service.id)?.name || 'Serviço'
                        ).join(' + ');

                        return (
                          <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <h4 className="font-medium text-base">{serviceNames}</h4>
                                  <Badge 
                                    variant={appointment.status === 'confirmed' ? 'default' : 'outline'}
                                    className="rounded-full px-2.5 py-0.5 text-xs"
                                  >
                                    {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <User className="w-4 h-4 mr-2 opacity-70" />
                                    <span>{appointment.client.name}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-600">
                                    <Phone className="w-4 h-4 mr-2 opacity-70" />
                                    <span>{appointment.client.phone}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                    <span>{formattedDate}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2 opacity-70" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {appointment.notes && (
                              <div className="mt-3 pt-3 border-t text-sm text-gray-600 flex">
                                <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 opacity-70" />
                                <span className="italic">{appointment.notes}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
