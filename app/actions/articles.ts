"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface CreateArticleData {
  title: string;
  content: string;
  category: string;
  featuredImage: string;
}

export async function createArticle(data: CreateArticleData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.articles.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      featuredImage: data.featuredImage,
      authorId: user.id,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}
