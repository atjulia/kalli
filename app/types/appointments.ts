
import { ClientData } from "./client";

export interface AppointmentData {
  date: Date;
  time: string;
  services: string[];
  client: ClientData;
  notes: string;
}

export interface UserAppointments {
  id: string;
  appointmentId: string;
  client: ClientData;
  date: string;
  time: string;
  services: string[];
  notes: string;
  status: string;
}