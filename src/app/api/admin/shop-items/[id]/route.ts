import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAdminToken } from "@/lib/admin-auth";
import { ObjectId } from "mongodb";

function requireAdmin() {
  const token = cookies().get("sp_admin")?.value;
  const payload = verifyAdminToken(token);
  if (!payload) {
    return null;
  }
  return payload;
}

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(request: Request, { params }: Params) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; price?: string; desc?: string; img?: string; featured?: boolean }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (body.name !== undefined) update.name = body.name.trim();
  if (body.price !== undefined) update.price = body.price.trim();
  if (body.desc !== undefined) update.desc = body.desc.trim();
  if (body.img !== undefined) update.img = body.img.trim();
  if (body.featured !== undefined) update.featured = !!body.featured;

  const db = await connectToDatabase();
  await db.collection("shop_items").updateOne({ _id: objectId }, { $set: update });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await connectToDatabase();
  await db.collection("shop_items").deleteOne({ _id: objectId });

  return NextResponse.json({ ok: true });
}

