'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Calendar } from "@/app/components/ui/calendar";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { addDays, format, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduleModalProps {
  selectedTime: string;
  selectedDate: Date;
  onClose: () => void;
  services: Array<{ id: string; name: string }>;
  clients: Array<{ id: string; name: string }>;
}

export function ScheduleModal({ 
  selectedTime, 
  selectedDate, 
  onClose, 
  services, 
  clients 
}: ScheduleModalProps) {
  const [service, setService] = useState("");
  const [client, setClient] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // criar agendamento
    console.log({
      date: selectedDate,
      time: selectedTime,
      service,
      client,
      notes
    });
    onClose();
  };

  return (
    <Dialog open={!!selectedTime} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Agendamento</DialogTitle>
          <DialogDescription>
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })} às {selectedTime}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Serviço
            </Label>
            <Select onValueChange={setService} value={service}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Cliente
            </Label>
            <Select onValueChange={setClient} value={client}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Observações
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Agendamento</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}