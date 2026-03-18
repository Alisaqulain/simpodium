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
  await db.collection("testimonials").deleteOne({ _id: objectId });

  return NextResponse.json({ ok: true });
}

