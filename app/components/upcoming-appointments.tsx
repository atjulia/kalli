'use client';

import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { useState } from 'react';

export function UpcomingAppointments({ appointments, user }: { appointments: any[]; user: any }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const displayDate = isToday
    ? "Hoje"
    : selectedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
      });

  const filteredAppointments = appointments.filter((appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Visualize e gerencie seus compromissos</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={goToPreviousDay}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              {displayDate}
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextDay}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-10">
              <Calendar className="mx-auto mb-2 w-5 h-5 opacity-50" />
              Nenhum agendamento para esta data.
            </div>
          ) : (
            filteredAppointments.map((appointment: any) => {
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
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
