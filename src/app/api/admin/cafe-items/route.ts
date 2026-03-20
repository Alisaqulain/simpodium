import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAdminToken } from "@/lib/admin-auth";
import { cafeItems } from "@/data/content";

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
  const items = await db.collection("cafe_items").find({}).sort({ createdAt: -1 }).toArray();

  if (items.length === 0) {
    const seedDocs = cafeItems.map((i) => ({
      name: i.name,
      desc: i.desc,
      price: i.price,
      category: "General",
      createdAt: new Date(),
    }));
    await db.collection("cafe_items").insertMany(seedDocs);
  }

  const fresh = await db.collection("cafe_items").find({}).sort({ createdAt: -1 }).toArray();

  return NextResponse.json(
    fresh.map((i) => ({
      id: i._id.toString(),
      name: i.name,
      price: i.price,
      desc: i.desc,
      category: i.category ?? "General",
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
    | { name?: string; price?: string; desc?: string; category?: string }
    | null;

  if (!body || !body.name || !body.price || !body.desc) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const doc = {
    name: body.name.trim(),
    price: body.price.trim(),
    desc: body.desc.trim(),
    category: (body.category ?? "General").trim(),
    createdAt: new Date(),
  };

  const db = await connectToDatabase();
  const result = await db.collection("cafe_items").insertOne(doc);

  return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
}

