'use client';

import { useState, useEffect } from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createAppointment } from '../actions/handle-appointments';
import { ScheduleModal } from './schedule-appointment-modal';
import { redirect } from "next/navigation";
import { Service } from '../types/service';
import { AppointmentData, UserAppointments } from '../types/appointments';
import { WorkingHours } from '../types/user';

interface AvailabilityScheduleProps {
  workingHours: WorkingHours;
  services: Service[];
  userId: string;
  appointments?: UserAppointments[];
}

export function AvailabilitySchedule({
  workingHours,
  services,
  userId,
  appointments
}: AvailabilityScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  useEffect(() => {
    const daysArray = [];
    for (let i = 0; i < 30; i++) {
      daysArray.push(addDays(new Date(), i));
    }
    setDays(daysArray);
  }, []);

  const getDayName = (date: Date) => {
    return format(date, 'EEEE', { locale: ptBR });
  };

  const getFormattedDate = (date: Date) => {
    return format(date, 'dd/MM', { locale: ptBR });
  };

  const getDayAvailability = (date: Date) => {
    const dayName = format(date, 'EEEE').toLowerCase();
    return workingHours[dayName] || { available: false, slots: [] };
  };

  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    
    while (startTime < endTime) {
      const timeString = startTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
      slots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return slots;
  };

  const isTimeBooked = (date: Date, time: string) => {
    const targetDate = format(date, 'yyyy-MM-dd');
    return appointments?.some(appointment => {
      const appointmentDate = appointment.date.split('T')[0];
      
      return (
        appointmentDate === targetDate &&
        appointment.time === time
      );
    });
  };

  const isTimeInPast = (date: Date, time: string) => {
    const now = new Date();
    
    if (!isSameDay(date, now)) {
      return false;
    }
  
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
  
    return slotTime < now;
  };

  const nextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const prevDay = () => {
    if (!isSameDay(currentDate, new Date())) {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleScheduleSubmit = async (data: AppointmentData) => {
    await createAppointment(data, userId)
    setSelectedTime(null);
    redirect("/dashboard")
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prevDay} disabled={isSameDay(currentDate, new Date())}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="text-center">
          <h3 className="text-lg font-medium capitalize">
            {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h3>
          <Button 
            variant="link" 
            className="text-sm text-gray-600" 
            onClick={goToToday}
          >
            Hoje
          </Button>
        </div>
        
        <Button variant="outline" onClick={nextDay}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">
            {getDayName(currentDate)} • {getFormattedDate(currentDate)}
          </h3>
          <Badge variant={getDayAvailability(currentDate).available ? 'default' : 'secondary'}>
            {getDayAvailability(currentDate).available ? 'Disponível' : 'Indisponível'}
          </Badge>
        </div>

        {getDayAvailability(currentDate).available ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {getDayAvailability(currentDate).slots.flatMap(slot => 
              generateTimeSlots(slot.start, slot.end).map(time => {
                const isBooked = isTimeBooked(currentDate, time);
                const isPastTime = isTimeInPast(currentDate, time);
                const isDisabled = isBooked || isPastTime;

                return (
                  <button
                    key={`${currentDate}-${time}`}
                    className={`rounded-md p-2 text-center text-sm transition-colors ${
                      isBooked
                        ? 'bg-red-50 text-red-400 cursor-not-allowed'
                        : isPastTime
                          ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    disabled={isDisabled}
                  >
                    {time}
                    {isBooked && <span className="block text-xs text-red-400">Reservado</span>}
                    {isPastTime && !isBooked && <span className="block text-xs text-gray-400">Indisponível</span>}
                  </button>
                );
              })
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Não há horários disponíveis neste dia</p>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.slice(0, 7).map(day => (
          <button
            key={day.toString()}
            onClick={() => setCurrentDate(day)}
            className={`p-2 text-center rounded-md text-sm transition-colors ${
              isSameDay(day, currentDate) 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="font-medium capitalize">
              {format(day, 'EEE', { locale: ptBR }).charAt(0)}
            </div>
            <div>{format(day, 'dd/MM')}</div>
          </button>
        ))}
      </div>

      <ScheduleModal
        selectedTime={selectedTime || ''}
        selectedDate={currentDate}
        onClose={() => setSelectedTime(null)}
        services={services}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
}