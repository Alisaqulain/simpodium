import { randomUUID } from "crypto";
import type { BookingPayload, BookingRecord } from "@/lib/bookings/types";

export interface BookingStorage {
  create(payload: BookingPayload): Promise<BookingRecord>;
  list(filters?: { simulator?: string; dates?: string[] }): Promise<BookingRecord[]>;
  isSlotBooked(simulator: string, date: string, time: string): Promise<boolean>;
}

class InMemoryBookingStorage implements BookingStorage {
  private bookings = new Map<string, BookingRecord>();

  private slotKey(simulator: string, date: string, time: string) {
    return `${simulator}__${date}__${time}`;
  }

  async create(payload: BookingPayload) {
    const createdAt = new Date().toISOString();
    const id = `BK-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const record: BookingRecord = { ...payload, id, createdAt };
    this.bookings.set(this.slotKey(record.simulator, record.date, record.time), record);
    return record;
  }

  async list(filters?: { simulator?: string; dates?: string[] }) {
    let items = Array.from(this.bookings.values());

    if (filters?.simulator) {
      items = items.filter((item) => item.simulator === filters.simulator);
    }
    if (filters?.dates && filters.dates.length > 0) {
      const allowed = new Set(filters.dates);
      items = items.filter((item) => allowed.has(item.date));
    }

    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async isSlotBooked(simulator: string, date: string, time: string) {
    return this.bookings.has(this.slotKey(simulator, date, time));
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __bookingStorage: BookingStorage | undefined;
}

export function getBookingStorage(): BookingStorage {
  if (!globalThis.__bookingStorage) {
    globalThis.__bookingStorage = new InMemoryBookingStorage();
  }
  return globalThis.__bookingStorage;
}

