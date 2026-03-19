import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
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
      mrp: i.mrp ?? null,
      salePrice: i.salePrice ?? null,
      points: typeof i.points === "number" ? i.points : null,
      createdAt: i.createdAt ?? null,
    })),
  );
}

