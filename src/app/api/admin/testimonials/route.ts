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
    .collection("testimonials")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return NextResponse.json(
    docs.map((t) => ({
      id: t._id.toString(),
      name: t.name,
      role: t.role,
      quote: t.quote,
      avatarUrl: t.avatarUrl ?? null,
      createdAt: t.createdAt ?? null,
    })),
  );
}

export async function POST(request: Request) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; role?: string; quote?: string; avatarUrl?: string | null }
    | null;

  if (!body || !body.name || !body.role || !body.quote) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const doc = {
    name: body.name.trim(),
    role: body.role.trim(),
    quote: body.quote.trim(),
    avatarUrl: body.avatarUrl?.trim() || null,
    createdAt: new Date(),
  };

  const db = await connectToDatabase();
  const result = await db.collection("testimonials").insertOne(doc);

  return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
}

