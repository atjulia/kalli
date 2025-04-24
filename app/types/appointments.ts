
import { ClientData } from "./client";

export interface AppointmentData {
  date: Date;
  time: string;
  services: string[];
  client: ClientData;
  notes: string;
}