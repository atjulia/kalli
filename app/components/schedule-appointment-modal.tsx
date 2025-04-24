'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
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
import { ClientData } from '../types/client';
import { Service } from '../types/service';

interface ScheduleModalProps {
  selectedTime: string;
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

export function ScheduleModal({
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
                        key={service.id}
                        onSelect={() => handleServiceSelect(service.id)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedServices.includes(service.id) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex-1">
                          <p>{service.name}</p>
                          <p className="text-xs text-gray-500">
                            {service.duration} • {service.price}
                          </p>
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
                  const service = services.find((s: { id: string; }) => s.id === serviceId);
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