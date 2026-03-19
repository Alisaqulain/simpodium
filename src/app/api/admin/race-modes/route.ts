import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
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
    .collection("race_modes")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return NextResponse.json(
    docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      price: d.price,
      note: d.note ?? "",
      points: typeof d.points === "number" ? d.points : null,
      accent: d.accent === "primary" || d.accent === "secondary" ? d.accent : "default",
      createdAt: d.createdAt ?? null,
    })),
  );
}

export async function POST(request: Request) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; price?: string; note?: string; points?: number | null; accent?: string }
    | null;

  if (!body || !body.name || !body.price) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const doc = {
    name: body.name.trim(),
    price: body.price.trim(),
    note: (body.note ?? "").trim(),
    points: typeof body.points === "number" ? body.points : null,
    accent: body.accent === "primary" || body.accent === "secondary" ? body.accent : "default",
    createdAt: new Date(),
  };

  const db = await connectToDatabase();
  const result = await db.collection("race_modes").insertOne(doc);

  return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
}

