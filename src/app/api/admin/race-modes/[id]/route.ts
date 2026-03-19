import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAdminToken } from "@/lib/admin-auth";

type Params = {
  params: {
    id: string;
  };
};

function requireAdmin() {
  const token = cookies().get("sp_admin")?.value;
  const payload = verifyAdminToken(token);
  if (!payload) {
    return null;
  }
  return payload;
}

export async function PATCH(request: Request, { params }: Params) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; price?: string; note?: string; points?: number | null; accent?: string }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (typeof body.name === "string") update.name = body.name.trim();
  if (typeof body.price === "string") update.price = body.price.trim();
  if (typeof body.note === "string") update.note = body.note.trim();
  if (typeof body.points === "number" || body.points === null) update.points = body.points;
  if (typeof body.accent === "string") {
    if (body.accent === "primary" || body.accent === "secondary") {
      update.accent = body.accent;
    } else {
      update.accent = "default";
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const db = await connectToDatabase();
  await db.collection("race_modes").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: update,
    },
  );

  const doc = await db.collection("race_modes").findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: doc._id.toString(),
    name: doc.name,
    price: doc.price,
    note: doc.note ?? "",
    points: typeof doc.points === "number" ? doc.points : null,
    accent: doc.accent === "primary" || doc.accent === "secondary" ? doc.accent : "default",
    createdAt: doc.createdAt ?? null,
  });
}

export async function DELETE(request: Request, { params }: Params) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const db = await connectToDatabase();
  await db.collection("race_modes").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ ok: true });
}

