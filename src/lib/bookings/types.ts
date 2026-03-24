export type BookingPayload = {
  simulator: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  phone: string;
  email: string;
};

export type BookingRecord = BookingPayload & {
  id: string;
  createdAt: string;
};

