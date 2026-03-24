import { booking } from "@/data/content";
import { isSupportedTimeSlot } from "@/lib/bookings/slots";
import type { BookingPayload } from "@/lib/bookings/types";

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isTime(value: string) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateBookingPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { ok: false as const, error: "Invalid payload" };
  }

  const data = payload as Partial<BookingPayload>;
  const normalized: BookingPayload = {
    simulator: data.simulator?.trim() ?? "",
    date: data.date?.trim() ?? "",
    time: data.time?.trim() ?? "",
    name: data.name?.trim() ?? "",
    phone: data.phone?.trim() ?? "",
    email: data.email?.trim().toLowerCase() ?? "",
  };

  if (
    !normalized.simulator ||
    !normalized.date ||
    !normalized.time ||
    !normalized.name ||
    !normalized.phone ||
    !normalized.email
  ) {
    return { ok: false as const, error: "Missing required fields" };
  }

  if (!booking.simulators.includes(normalized.simulator as (typeof booking.simulators)[number])) {
    return { ok: false as const, error: "Invalid simulator" };
  }

  if (!isIsoDate(normalized.date)) {
    return { ok: false as const, error: "Invalid date format" };
  }

  if (!isTime(normalized.time)) {
    return { ok: false as const, error: "Invalid time format" };
  }

  if (!isSupportedTimeSlot(normalized.time)) {
    return { ok: false as const, error: "Time is outside booking window" };
  }

  if (normalized.name.length < 2) {
    return { ok: false as const, error: "Name is too short" };
  }

  if (normalized.phone.length < 8) {
    return { ok: false as const, error: "Phone is too short" };
  }

  if (!isEmail(normalized.email)) {
    return { ok: false as const, error: "Invalid email address" };
  }

  return { ok: true as const, data: normalized };
}

