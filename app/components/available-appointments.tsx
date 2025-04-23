'use client';

import { useState, useEffect } from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface WorkingHours {
  [key: string]: {
    slots: {
      start: string;
      end: string;
    }[];
    available: boolean;
  };
}

interface Service {
  serviceId: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface AvailabilityScheduleProps {
  workingHours: WorkingHours;
  services: Service[];
}

interface ClientData {
  name: string;
  phone: string;
  email: string;
}

interface ScheduleModalProps {
  selectedTime: string | null;
  selectedDate: Date;
  onClose: () => void;
  services: Service[];
  onSubmit: (data: {
    date: Date;
    time: string;
    services: string[];
    client: ClientData;
    notes: string;
  }) => void;
}

function ScheduleModal({
  selectedTime,
  selectedDate,
  onClose,
  services,
  onSubmit,
}: ScheduleModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [client, setClient] = useState<ClientData>({
    name: '',
    phone: '',
    email: ''
  });
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime && selectedServices.length > 0 && client.name && client.phone) {
      onSubmit({
        date: selectedDate,
        time: selectedTime,
        services: selectedServices,
        client,
        notes,
      });
    }
  };

  return (
    <Dialog open={!!selectedTime} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Agendamento</DialogTitle>
          <DialogDescription>
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })} às {selectedTime}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Serviços</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedServices.length > 0
                    ? `${selectedServices.length} serviço(s) selecionado(s)`
                    : "Selecione os serviços"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar serviços..." />
                  <CommandEmpty>Nenhum serviço encontrado.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                    {services.map((service) => (
                      <CommandItem
                        key={service.serviceId}
                        onSelect={() => handleServiceSelect(service.serviceId)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedServices.includes(service.serviceId) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex-1">
                          <p>{service.name}</p>
                          {/* <p className="text-xs text-gray-500">
                            {service.duration} • {service.price}
                          </p> */}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedServices.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedServices.map(serviceId => {
                  const service = services.find(s => s.serviceId === serviceId);
                  return (
                    <div key={serviceId} className="flex justify-between text-sm">
                      <Badge variant="secondary">{service?.name}</Badge>
                      {/* <span className="text-gray-500">{service?.price}</span> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label>Dados do Cliente</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nome completo</Label>
                <Input
                  id="client-name"
                  value={client.name}
                  onChange={(e) => setClient({...client, name: e.target.value})}
                  placeholder="Nome do cliente"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Telefone</Label>
                <Input
                  id="client-phone"
                  value={client.phone}
                  onChange={(e) => setClient({...client, phone: e.target.value})}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-email">E-mail</Label>
              <Input
                id="client-email"
                type="email"
                value={client.email}
                onChange={(e) => setClient({...client, email: e.target.value})}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Alguma observação importante?"
              className="min-h-[100px]"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <p className="text-sm text-blue-800">
              Este agendamento será enviado para aprovação. Você receberá uma confirmação por e-mail assim que o prestador confirmar o horário.
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={selectedServices.length === 0 || !client.name || !client.phone}>
              Solicitar Agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AvailabilitySchedule({
  workingHours,
  services,
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

  const handleScheduleSubmit = (data: {
    date: Date;
    time: string;
    services: string[];
    client: ClientData;
    notes: string;
  }) => {
    console.log("criar agendamento", data);
    setSelectedTime(null);
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
              generateTimeSlots(slot.start, slot.end).map(time => (
                <button
                  key={`${currentDate}-${time}`}
                  onClick={() => setSelectedTime(time)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md p-2 text-center text-sm transition-colors"
                >
                  {time}
                </button>
              ))
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
        selectedTime={selectedTime}
        selectedDate={currentDate}
        onClose={() => setSelectedTime(null)}
        services={services}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
}