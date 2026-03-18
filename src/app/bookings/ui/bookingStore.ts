"use client";

export type BookingRecord = {
  id: string;
  simulator: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  phone: string;
  email: string;
  createdAt: number;
};

const KEY = "simpodium_bookings_v1";

function safeParse(json: string | null): BookingRecord[] {
  if (!json) return [];
  try {
    const val = JSON.parse(json) as unknown;
    if (!Array.isArray(val)) return [];
    return val as BookingRecord[];
  } catch {
    return [];
  }
}

export function listBookings(): BookingRecord[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(KEY));
}

export function saveBooking(rec: BookingRecord) {
  if (typeof window === "undefined") return;
  const all = listBookings();
  all.unshift(rec);
  window.localStorage.setItem(KEY, JSON.stringify(all.slice(0, 300)));
}

export function isSlotBooked(simulator: string, date: string, time: string) {
  const all = listBookings();
  return all.some((b) => b.simulator === simulator && b.date === date && b.time === time);
}

export function clearAllBookings() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

