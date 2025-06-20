"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function addComment(articleId: string, body: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await db.comment.create({
    data: {
      body: body.trim(),
      articleId,
      userId: user.id,
    },
  })

  revalidatePath(`/articles/${articleId}`)
}
