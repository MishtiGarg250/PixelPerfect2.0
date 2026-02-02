import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function isAdminEmail(email?: string) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Try to find existing user
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If user exists and is in ADMIN_EMAILS but role isn't set, promote them
  if (user && isAdminEmail(user.email) && user.role !== "admin") {
    user = await db.user.update({
      where: { id: user.id },
      data: { role: "admin" },
    });
  }

  // If user doesn't exist, create them
  if (!user) {
    const clerkUser = await currentUser();

    if (clerkUser) {
      const email = clerkUser.emailAddresses[0]?.emailAddress || "";

      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email,
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            "User",
          imageUrl: clerkUser.imageUrl,
          role: isAdminEmail(email) ? "admin" : "user",
        },
      });
    }
  }

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.role !== "admin" && !isAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }

  return user;
}
