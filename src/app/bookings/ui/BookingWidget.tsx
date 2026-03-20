"use client";

import { useEffect, useMemo, useState } from "react";
import { booking, business } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { saveBooking, isSlotBooked, type BookingRecord } from "./bookingStore";

function fieldBase() {
  return "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,43,60,0.35)]";
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatTime12h(time24: string) {
  const [hhStr, mmStr] = time24.split(":");
  const hh = Number(hhStr);
  const mm = Number(mmStr);
  const ampm = hh >= 12 ? "PM" : "AM";
  const displayH = hh % 12 === 0 ? 12 : hh % 12;
  const displayM = String(mm).padStart(2, "0");
  return `${displayH}:${displayM} ${ampm}`;
}

export function BookingWidget() {
  const [simulator, setSimulator] = useState<(typeof booking.simulators)[number]>(
    booking.simulators[0],
  );
  const [date, setDate] = useState<string>(todayISO());
  const [slotDate, setSlotDate] = useState<string>(todayISO());
  const [time, setTime] = useState<(typeof booking.slots)[number]>(booking.slots[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState<BookingRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const slotOptions = useMemo(() => {
    const [yyyyStr, mmStr, ddStr] = date.split("-");
    const yyyy = Number(yyyyStr);
    const mm = Number(mmStr);
    const dd = Number(ddStr);
    const selected = new Date(yyyy, mm - 1, dd);
    const day = selected.getDay(); // 0=Sun ... 5=Fri, 6=Sat
    const isFriOrSat = day === 5 || day === 6;

    const pad2 = (n: number) => String(n).padStart(2, "0");
    const addDaysISO = (d: Date, days: number) => {
      const x = new Date(d);
      x.setDate(x.getDate() + days);
      return `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`;
    };

    const mkSlots = (startMin: number, endMin: number, slotDayOffset: number) => {
      const arr: Array<{ slotDate: string; time: (typeof booking.slots)[number] }> = [];
      const step = 15;
      for (let m = startMin; m <= endMin; m += step) {
        const hh = Math.floor(m / 60);
        const mi = m % 60;
        const timeStr = `${pad2(hh)}:${pad2(mi)}` as (typeof booking.slots)[number];
        arr.push({ slotDate: addDaysISO(selected, slotDayOffset), time: timeStr });
      }
      return arr;
    };

    // Open at 10:00. Slots are 15 minutes each.
    // Weekdays close by 11:00 PM (last start 22:45 ends 23:00).
    // Friday & Saturday close by 1:00 AM (last start 23:45 ends 00:00, plus 00:00-00:45 next day).
    const sameDayEndLastStart = isFriOrSat ? 23 * 60 + 45 : 22 * 60 + 45;
    const nextDayEndLastStart = isFriOrSat ? 0 * 60 + 45 : -1;

    const slots = [
      ...mkSlots(10 * 60, sameDayEndLastStart, 0),
      ...(isFriOrSat ? mkSlots(0, nextDayEndLastStart, 1) : []),
    ];

    return slots;
  }, [date]);

  const availableSlots = useMemo(() => {
    return slotOptions.map((s) => ({
      time: s.time,
      slotDate: s.slotDate,
      available: hydrated ? !isSlotBooked(simulator, s.slotDate, s.time) : true,
    }));
  }, [hydrated, simulator, slotOptions]);

  useEffect(() => {
    if (!hydrated) return;
    const stillValid = availableSlots.some((s) => s.time === time && s.slotDate === slotDate);
    if (!stillValid && availableSlots.length > 0) {
      setTime(availableSlots[0].time);
      setSlotDate(availableSlots[0].slotDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableSlots, hydrated]);

  const canBook = useMemo(() => {
    if (!hydrated) return false;
    if (name.trim().length < 2) return false;
    if (!email.includes("@")) return false;
    if (phone.trim().length < 8) return false;
    if (isSlotBooked(simulator, slotDate, time)) return false;
    return true;
  }, [email, hydrated, name, phone, simulator, slotDate, time]);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="sp-glass sp-neon-border p-6">
          <div className="text-sm font-semibold tracking-wide text-white/90">
            Booking details
          </div>
          <p className="mt-2 text-sm leading-7 text-white/70">
            Pick your simulator and time. Available slots update instantly.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs font-semibold tracking-[0.22em] text-white/55">
                SIMULATOR
              </div>
              <select
                className={fieldBase()}
                value={simulator}
                onChange={(e) =>
                  setSimulator(e.target.value as (typeof booking.simulators)[number])
                }
              >
                {booking.simulators.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold tracking-[0.22em] text-white/55">
                DATE
              </div>
              <input
                className={fieldBase()}
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSlotDate(e.target.value);
                }}
                min={todayISO()}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold tracking-[0.22em] text-white/55">
              TIME SLOTS
            </div>
            <p className="mb-4 text-[11px] leading-6 text-white/55">
              Slots are every <span className="text-white/80">15 minutes</span>.
              Weekdays close by <span className="text-white/80">11:00 PM</span>. Friday & Saturday close by{" "}
              <span className="text-white/80">1:00 AM</span>.
            </p>
            <div className="max-h-72 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {availableSlots.map((s) => {
                  const selected = time === s.time && slotDate === s.slotDate;
                return (
                  <button
                    key={`${s.slotDate}_${s.time}`}
                    type="button"
                    disabled={!s.available}
                    onClick={() => {
                      setSlotDate(s.slotDate);
                      setTime(s.time);
                    }}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
                      s.available
                        ? "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                        : "border-white/5 bg-white/3 text-white/35",
                      selected && s.available && "sp-neon-border",
                    )}
                    style={
                      selected && s.available
                        ? { boxShadow: "0 0 28px rgba(255,43,60,0.20)" }
                        : undefined
                    }
                  >
                    {formatTime12h(s.time)}
                  </button>
                );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sp-glass sp-glow-hover p-6">
          <div className="text-sm font-semibold tracking-wide text-white/90">
            Your info
          </div>
          <p className="mt-2 text-sm leading-7 text-white/70">
            We’ll use this to confirm your slot.
          </p>

          <div className="mt-6 grid gap-4">
            <input
              className={fieldBase()}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={fieldBase()}
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              required
            />
            <input
              className={fieldBase()}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              required
            />
          </div>

          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
              SUMMARY
            </div>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/60">Simulator</span>
                <span className="font-semibold">{simulator}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/60">Date</span>
                <span className="font-semibold">{date}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/60">Time</span>
                <span className="font-semibold">{formatTime12h(time)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!canBook || submitting}
              onClick={async () => {
                if (!canBook || submitting) return;
                setError(null);
                setSubmitting(true);
                const rec: BookingRecord = {
                  id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
                  simulator,
                  date: slotDate,
                  time,
                  name: name.trim(),
                  phone: phone.trim(),
                  email: email.trim(),
                  createdAt: Date.now(),
                };
                try {
                  const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      simulator: rec.simulator,
                      date: rec.date,
                      time: rec.time,
                      name: rec.name,
                      phone: rec.phone,
                      email: rec.email,
                    }),
                  });
                  if (!res.ok) {
                    throw new Error("Booking failed");
                  }
                  saveBooking(rec);
                  setConfirmed(rec);
                } catch (err) {
                  console.error(err);
                  setError("Could not confirm booking. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {submitting ? "Confirming..." : "Confirm Booking"}
            </Button>
            {error ? (
              <div className="mt-2 text-xs text-red-300">{error}</div>
            ) : null}
            <div className="mt-3 text-xs text-white/50">
              By confirming, you agree to arrive on time. Need help? Email{" "}
              <a className="text-white/70 hover:text-white" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              .
            </div>
          </div>
        </div>
      </div>

      {confirmed ? (
        <div className="lg:col-span-12">
          <div className="sp-glass sp-neon-border p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold tracking-wide text-white/90">
                  Booking confirmed
                </div>
                <div className="mt-2 text-sm text-white/70">
                  {confirmed.simulator} • {confirmed.date} • {formatTime12h(confirmed.time)}
                </div>
                <div className="mt-1 text-xs font-mono tracking-[0.22em] text-white/55">
                  CONFIRMATION ID: {confirmed.id}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmed(null)}
                >
                  Close
                </Button>
                <Button href="/contact">Need directions?</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

