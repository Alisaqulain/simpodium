import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { shopProducts } from "@/data/content";

export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("shop_items").find({}).sort({ createdAt: -1 }).toArray();

  if (items.length === 0) {
    const seedDocs = shopProducts.map((p) => ({
      name: p.name,
      desc: p.desc,
      price: p.price,
      mrp: p.price,
      salePrice: null,
      points: null,
      img: p.img,
      featured: false,
      createdAt: new Date(),
    }));
    await db.collection("shop_items").insertMany(seedDocs);
  }

  const fresh = await db.collection("shop_items").find({}).sort({ createdAt: -1 }).toArray();

  return NextResponse.json(
    fresh.map((i) => ({
      id: i._id.toString(),
      name: i.name,
      price: i.price,
      desc: i.desc,
      img: i.img,
      featured: !!i.featured,
      mrp: i.mrp ?? null,
      salePrice: i.salePrice ?? null,
      points: typeof i.points === "number" ? i.points : null,
      createdAt: i.createdAt ?? null,
    })),
  );
}

