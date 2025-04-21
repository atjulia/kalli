import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { handleAuth } from "@/app/actions/handle-auth"
import Link from "next/link";
import { Calendar, Clock, User, Settings, Plus, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';

export default async function Dashboard() {
	const session = await auth();
  console.log("session dashboard", session);
	if (!session) {
		redirect("/login");
	}

  const upcomingAppointments = [
    { id: 1, client: 'Ana Silva', service: 'Corte de Cabelo', date: '2023-11-15', time: '14:00', status: 'confirmado' },
    { id: 2, client: 'Carlos Oliveira', service: 'Manicure', date: '2023-11-16', time: '10:30', status: 'confirmado' },
    { id: 3, client: 'Mariana Costa', service: 'Massagem', date: '2023-11-17', time: '16:00', status: 'pendente' }
  ];

  const availableSlots = [
    { id: 1, date: '2023-11-15', time: '09:00' },
    { id: 2, date: '2023-11-15', time: '11:00' },
    { id: 3, date: '2023-11-16', time: '13:30' },
    { id: 4, date: '2023-11-17', time: '15:00' }
  ];

  const services = [
    { id: 1, name: 'Corte de Cabelo', duration: '60 min', price: 'R$ 60,00' },
    { id: 2, name: 'Manicure', duration: '45 min', price: 'R$ 35,00' },
    { id: 3, name: 'Massagem', duration: '90 min', price: 'R$ 120,00' }
  ];

	 return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
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
                {services.map(service => (
                  <div key={service.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration} • {service.price}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar serviço
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo agendamento
              </Button>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {availableSlots.map(slot => (
                        <div key={slot.id} className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                          <p className="font-medium">{slot.date}</p>
                          <p className="text-indigo-600">{slot.time}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar horário
                    </Button>
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
