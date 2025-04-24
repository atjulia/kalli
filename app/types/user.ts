export interface TimeSlot {
  start: string
  end: string
}

export interface DaySchedule {
  available: boolean
  slots: TimeSlot[]
}

export interface WorkingHours {
  [key: string]: {
    slots: {
      start: string;
      end: string;
    }[];
    available: boolean;
  };
}