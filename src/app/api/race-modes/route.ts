import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const docs = await db
    .collection("race_modes")
    .find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  return NextResponse.json(
    docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      price: d.price,
      note: d.note ?? "",
      points: typeof d.points === "number" ? d.points : null,
      accent: d.accent === "primary" || d.accent === "secondary" ? d.accent : "default",
    })),
  );
}

