import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAdminToken } from "@/lib/admin-auth";

function requireAdmin() {
  const token = cookies().get("sp_admin")?.value;
  const payload = verifyAdminToken(token);
  if (!payload) {
    return null;
  }
  return payload;
}

export async function GET() {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

