import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { clerkUserId, email, name, imageUrl } = await req.json();

    if (!clerkUserId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Upsert user in database
    await db.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name,
        imageUrl,
      },
      create: {
        clerkUserId,
        email,
        name,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
