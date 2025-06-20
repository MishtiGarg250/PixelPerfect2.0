"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function toggleLike(articleId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const existingLike = await db.like.findUnique({
    where: {
      userId_articleId: {
        userId: user.id,
        articleId: articleId,
      },
    },
  })

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    })
  } else {
    await db.like.create({
      data: {
        userId: user.id,
        articleId: articleId,
      },
    })
  }

  revalidatePath("/articles")
  revalidatePath(`/articles/${articleId}`)
}
