import { NextResponse } from "next/server";
import { getBookingStorage } from "@/lib/bookings/storage";
import { validateBookingPayload } from "@/lib/bookings/validation";
import { sendEmail } from "@/lib/email/sendEmail";
import { enforceBookingRateLimit } from "@/lib/rate-limit";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  return realIp?.trim() || "unknown";
}

export async function GET(request: Request) {
  const storage = getBookingStorage();
  const { searchParams } = new URL(request.url);
  const simulator = searchParams.get("simulator") ?? undefined;
  const datesRaw = searchParams.get("dates");
  const dates = datesRaw ? datesRaw.split(",").map((item) => item.trim()).filter(Boolean) : undefined;

  const bookings = await storage.list({ simulator, dates });
  return NextResponse.json({
    bookings: bookings.map((item) => ({
      id: item.id,
      simulator: item.simulator,
      date: item.date,
      time: item.time,
    })),
  });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = await enforceBookingRateLimit(`booking:${ip}`);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many booking attempts. Try again in a minute." }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const validation = validateBookingPayload(payload);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const storage = getBookingStorage();
  const alreadyBooked = await storage.isSlotBooked(
    validation.data.simulator,
    validation.data.date,
    validation.data.time,
  );

  if (alreadyBooked) {
    return NextResponse.json({ error: "This slot is already booked." }, { status: 409 });
  }

  const record = await storage.create(validation.data);

  const ownerEmail = process.env.OWNER_EMAIL;
  const details = [
    `Booking ID: ${record.id}`,
    `Simulator: ${record.simulator}`,
    `Date: ${record.date}`,
    `Time: ${record.time}`,
    `Name: ${record.name}`,
    `Phone: ${record.phone}`,
    `Email: ${record.email}`,
    `Created At: ${record.createdAt}`,
  ].join("\n");

  if (ownerEmail) {
    const emailResults = await Promise.allSettled([
      sendEmail({
        to: ownerEmail,
        subject: `New booking received (${record.id})`,
        text: `A new booking was submitted.\n\n${details}`,
      }),
      sendEmail({
        to: record.email,
        subject: `Booking confirmation (${record.id})`,
        text: `Your booking is confirmed.\n\n${details}\n\nSee you at SIM PODIUM!`,
      }),
    ]);
    if (emailResults.some((result) => result.status === "rejected")) {
      console.error("Failed to send one or more booking emails", emailResults);
    }
  } else {
    console.error("OWNER_EMAIL is not set; owner booking notifications are disabled");
  }

  return NextResponse.json({ booking: record }, { status: 201 });
}

