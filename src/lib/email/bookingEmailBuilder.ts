import type { BookingRecord } from "@/lib/bookings/types";

type BuiltEmail = {
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCreatedAt(createdAt: string) {
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) return createdAt;
  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(time: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return time;
  const [, hourRaw, minuteRaw] = match;
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (hour > 23 || minute > 59) return time;
  const meridiem = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${meridiem}`;
}

function cardRow(label: string, value: string) {
  return `<p style="margin: 0 0 8px 0;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

export function buildOwnerBookingEmail(record: BookingRecord): BuiltEmail {
  const readableDate = formatDate(record.date);
  const readableTime = formatTime(record.time);
  const readableCreatedAt = formatCreatedAt(record.createdAt);

  return {
    subject: `New booking received (${record.id})`,
    text: [
      "New booking received",
      "--------------------",
      "",
      "Booking details",
      `Booking ID: ${record.id}`,
      `Simulator: ${record.simulator}`,
      `Date: ${readableDate}`,
      `Time: ${readableTime}`,
      `Created At: ${readableCreatedAt}`,
      "",
      "Customer details",
      `Name: ${record.name}`,
      `Phone: ${record.phone}`,
      `Email: ${record.email}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5; max-width: 640px;">
        <h2 style="margin: 0 0 16px 0;">New Booking Received</h2>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 0 0 18px 0;" />

        <section style="margin: 0 0 18px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px;">Booking Details</h3>
          ${cardRow("Booking ID", record.id)}
          ${cardRow("Simulator", record.simulator)}
          ${cardRow("Date", readableDate)}
          ${cardRow("Time", readableTime)}
          ${cardRow("Created At", readableCreatedAt)}
        </section>

        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 0 0 18px 0;" />

        <section style="margin: 0 0 4px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px;">Customer Details</h3>
          ${cardRow("Name", record.name)}
          ${cardRow("Phone", record.phone)}
          ${cardRow("Email", record.email)}
        </section>
      </div>
    `.trim(),
  };
}

export function buildUserBookingEmail(record: BookingRecord): BuiltEmail {
  const readableDate = formatDate(record.date);
  const readableTime = formatTime(record.time);

  return {
    subject: `Booking confirmed (${record.id})`,
    text: [
      `Hi ${record.name},`,
      "",
      "Your booking is confirmed.",
      "",
      "Booking details",
      `Booking ID: ${record.id}`,
      `Simulator: ${record.simulator}`,
      `Date: ${readableDate}`,
      `Time: ${readableTime}`,
      "",
      "Please arrive 10 minutes early.",
      "We look forward to seeing you.",
      "Reply to this email for help.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5; max-width: 640px;">
        <h2 style="margin: 0 0 12px 0;">Your booking is confirmed &#127881;</h2>
        <p style="margin: 0 0 14px 0;">Hi ${escapeHtml(record.name)},</p>
        <p style="margin: 0 0 16px 0;">Thanks for booking with us. Your session is now confirmed.</p>

        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 0 0 18px 0;" />

        <section style="margin: 0 0 18px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px;">Booking Details</h3>
          ${cardRow("Booking ID", record.id)}
          ${cardRow("Simulator", record.simulator)}
          ${cardRow("Date", readableDate)}
          ${cardRow("Time", readableTime)}
        </section>

        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 0 0 16px 0;" />

        <section style="margin: 0 0 14px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Please arrive 10 minutes early.</strong></p>
          <p style="margin: 0 0 8px 0;">We look forward to seeing you.</p>
          <p style="margin: 0;">Reply to this email for help.</p>
        </section>
      </div>
    `.trim(),
  };
}

