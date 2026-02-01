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

interface UpdateArticleData extends CreateArticleData {
  id: string;
}

export async function updateArticle(data: UpdateArticleData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    await db.articles.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        featuredImage: data.featuredImage,
      },
    });

    revalidatePath("/articles");
    revalidatePath(`/articles/${data.id}`);
    revalidatePath("/admin/articles");
  } catch (error) {
    console.error("Error updating article:", error);
    throw new Error("Failed to update article");
  }
}

export async function getArticleById(id: string) {
  const article = await db.articles.findUnique({
    where: { id },
  });

  return article;
}

export async function deleteArticle(articleId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    await db.like.deleteMany({
      where: {
        articleId: articleId,
      },
    });

    await db.comment.deleteMany({
      where: {
        articleId: articleId,
      },
    });

    await db.articles.delete({
      where: {
        id: articleId,
      },
    });

    revalidatePath("/articles");
    revalidatePath("/admin/articles");
  } catch (error) {
    console.error("Error deleting article:", error);
    throw new Error("Failed to delete article");
  }
}