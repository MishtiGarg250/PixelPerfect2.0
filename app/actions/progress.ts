"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProgress(
  itemId: string,
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.progress.upsert({
    where: {
      userId_itemId: {
        userId: user.id,
        itemId: itemId,
      },
    },
    update: {
      status: status,
    },
    create: {
      userId: user.id,
      itemId: itemId,
      status: status,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tracks");
  revalidatePath("/dashboard/track");
}
