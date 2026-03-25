const SLOT_STEP_MINUTES = 15;
const START_MINUTES = 10 * 60; // 10:00
const WEEKDAY_LAST_START = 22 * 60 + 45; // 22:45 => ends 23:00
const WEEKEND_LAST_START = 23 * 60 + 45; // 23:45 => ends 00:00
const WEEKEND_NEXT_DAY_LAST_START = 45; // 00:45 => ends 01:00

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function formatIso(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function addDays(baseDate: Date, days: number) {
  const next = new Date(baseDate);
  next.setDate(next.getDate() + days);
  return next;
}

function parseIsoDate(isoDate: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const [year, month, day] = isoDate.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }
  return parsed;
}

function slotTimes(startMinutes: number, lastStartMinutes: number) {
  const slots: string[] = [];
  for (let minutes = startMinutes; minutes <= lastStartMinutes; minutes += SLOT_STEP_MINUTES) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(`${pad2(hour)}:${pad2(minute)}`);
  }
  return slots;
}

export type SlotOption = {
  slotDate: string;
  time: string;
};

export function getSlotOptions(bookingDate: string): SlotOption[] {
  const parsed = parseIsoDate(bookingDate);
  if (!parsed) return [];

  const day = parsed.getDay();
  const isFridayOrSaturday = day === 5 || day === 6;

  const slots: SlotOption[] = slotTimes(
    START_MINUTES,
    isFridayOrSaturday ? WEEKEND_LAST_START : WEEKDAY_LAST_START,
  ).map((time) => ({ slotDate: bookingDate, time }));

  if (isFridayOrSaturday) {
    const nextDateIso = formatIso(addDays(parsed, 1));
    const overnightSlots = slotTimes(0, WEEKEND_NEXT_DAY_LAST_START).map((time) => ({
      slotDate: nextDateIso,
      time,
    }));
    return [...slots, ...overnightSlots];
  }

  return slots;
}

export function isValidSlotForBookingDate(bookingDate: string, slotDate: string, time: string) {
  return getSlotOptions(bookingDate).some((slot) => slot.slotDate === slotDate && slot.time === time);
}

const supportedTimes = new Set([
  ...slotTimes(START_MINUTES, WEEKEND_LAST_START),
  ...slotTimes(0, WEEKEND_NEXT_DAY_LAST_START),
]);

export function isSupportedTimeSlot(time: string) {
  return supportedTimes.has(time);
}

