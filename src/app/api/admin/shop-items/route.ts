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

export async function GET() {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await connectToDatabase();
  const items = await db.collection("shop_items").find({}).sort({ createdAt: -1 }).toArray();

  return NextResponse.json(
    items.map((i) => ({
      id: i._id.toString(),
      name: i.name,
      price: i.price,
      desc: i.desc,
      img: i.img,
      featured: !!i.featured,
      createdAt: i.createdAt ?? null,
    })),
  );
}

export async function POST(request: Request) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; price?: string; desc?: string; img?: string; featured?: boolean }
    | null;

  if (!body || !body.name || !body.price || !body.desc || !body.img) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const doc = {
    name: body.name.trim(),
    price: body.price.trim(),
    desc: body.desc.trim(),
    img: body.img.trim(),
    featured: !!body.featured,
    createdAt: new Date(),
  };

  const db = await connectToDatabase();
  const result = await db.collection("shop_items").insertOne(doc);

  return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
}

