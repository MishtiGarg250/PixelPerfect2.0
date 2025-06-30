"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface RoadmapItem {
  title: string;
  link: string;
}

interface Module {
  title: string;
  items: RoadmapItem[];
}

interface CreateTrackData {
  title: string;
  description: string;
  modules: Module[];
}

export async function createTrack(data: CreateTrackData) {
  const user = await getCurrentUser();

  // if (!user || user.role !== "admin") {
  //   throw new Error("Unauthorized")
  // }

  try {
    await db.track.create({
      data: {
        title: data.title,
        description: data.description,
        modules: {
          create: data.modules.map((module) => ({
            title: module.title,
            items: {
              create: module.items.map((item) => ({
                title: item.title,
                link: item.link || null,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/dashboard/tracks");
    revalidatePath("/admin/tracks");
  } catch (error) {
    console.error("Error creating track:", error);
    throw new Error("Failed to create track");
  }
}

export async function updateTrack(data: CreateTrackData & { id: string }) {
  const user = await getCurrentUser();

  // if (!user || user.role !== "admin") {
  //   throw new Error("Unauthorized")
  // }

  try {
    // Delete existing modules and items, then recreate them
    await db.roadmapItem.deleteMany({
      where: {
        module: {
          trackId: data.id,
        },
      },
    });

    await db.module.deleteMany({
      where: {
        trackId: data.id,
      },
    });

    // Update track and create new modules/items
    await db.track.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        modules: {
          create: data.modules.map((module) => ({
            title: module.title,
            items: {
              create: module.items.map((item) => ({
                title: item.title,
                link: item.link || null,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/dashboard/tracks");
    revalidatePath("/admin/tracks");
  } catch (error) {
    console.error("Error updating track:", error);
    throw new Error("Failed to update track");
  }
}

export async function deleteTrack(trackId: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  try {
    // Delete in correct order to handle foreign key constraints
    // 1. Delete all progress records for items in this track
    await db.progress.deleteMany({
      where: {
        item: {
          module: {
            trackId: trackId,
          },
        },
      },
    });

    // 2. Delete all roadmap items
    await db.roadmapItem.deleteMany({
      where: {
        module: {
          trackId: trackId,
        },
      },
    });

    // 3. Delete all modules
    await db.module.deleteMany({
      where: {
        trackId: trackId,
      },
    });

    // 4. Finally delete the track
    await db.track.delete({
      where: {
        id: trackId,
      },
    });

    revalidatePath("/dashboard/tracks");
    revalidatePath("/admin/tracks");
  } catch (error) {
    console.error("Error deleting track:", error);
    throw new Error("Failed to delete track");
  }
}
