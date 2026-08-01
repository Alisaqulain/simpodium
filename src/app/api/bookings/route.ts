import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { booking } from "@/data/content";
import { features } from "@/config/features";

export async function GET() {
  const db = await connectToDatabase();
  const docs = await db
    .collection("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return NextResponse.json(
    docs.map((b) => ({
      id: b._id.toString(),
      simulator: b.simulator,
      date: b.date,
      time: b.time,
      name: b.name,
      phone: b.phone,
      email: b.email,
      createdAt: b.createdAt ?? null,
    })),
  );
}

export async function POST(request: Request) {
  if (!features.bookingSlots) {
    return NextResponse.json(
      { error: "Online booking is temporarily unavailable" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | {
        simulator?: string;
        date?: string;
        time?: string;
        name?: string;
        phone?: string;
        email?: string;
      }
    | null;

  if (
    !body ||
    !body.simulator ||
    !body.date ||
    !body.time ||
    !body.name ||
    !body.phone ||
    !body.email
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const validSimulator = booking.simulators.includes(body.simulator as (typeof booking.simulators)[number]);
  const validTime = booking.slots.includes(body.time as (typeof booking.slots)[number]);

  if (!validSimulator || !validTime) {
    return NextResponse.json({ error: "Invalid simulator or time" }, { status: 400 });
  }

  const doc = {
    simulator: body.simulator,
    date: body.date,
    time: body.time,
    name: body.name.trim(),
    phone: body.phone.trim(),
    email: body.email.trim(),
    createdAt: new Date(),
  };

  const db = await connectToDatabase();
  const result = await db.collection("bookings").insertOne(doc);

  return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
}

