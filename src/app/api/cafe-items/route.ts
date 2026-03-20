import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { cafeItems } from "@/data/content";

export async function GET() {
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

