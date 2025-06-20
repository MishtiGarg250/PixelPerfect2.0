import { auth,currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function getCurrentUser() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  // Try to find existing user
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  })

  // If user doesn't exist, create them
  if (!user) {
    const clerkUser  = await currentUser()

    if (clerkUser) {
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
          imageUrl: clerkUser.imageUrl,
        },
      })
    }
  }

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}
