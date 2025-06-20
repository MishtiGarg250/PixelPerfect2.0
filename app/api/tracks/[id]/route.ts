import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const user = await getCurrentUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const track = await db.track.findUnique({
      where: { id: params.id },
      include: {
        modules: {
          include: {
            items: true,
          },
        },
      },
    })

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 })
    }

    return NextResponse.json(track)
  } catch (error) {
    console.error("Error fetching track:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
