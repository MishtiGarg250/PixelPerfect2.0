"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
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
  await requireAdmin();

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
  await requireAdmin();

  try {
    console.log(`Updating track ${data.id} with ${data.modules.length} modules`);

  
    const MAX_MODULES = 500;
    if (data.modules.length > MAX_MODULES) {
      throw new Error(`Too many modules (${data.modules.length}). Max allowed is ${MAX_MODULES}.`);
    }

    const deleteStart = Date.now();
    await db.$transaction(
      async (tx) => {
        await tx.progress.deleteMany({
          where: {
            item: {
              module: {
                trackId: data.id,
              },
            },
          },
        });

        await tx.roadmapItem.deleteMany({
          where: {
            module: {
              trackId: data.id,
            },
          },
        });

        await tx.module.deleteMany({
          where: {
            trackId: data.id,
          },
        });
      },
      { timeout: 15000 },
    );
    
    const createStart = Date.now();

    await db.$transaction(
      async (tx) => {
    
        await tx.track.update({
          where: { id: data.id },
          data: {
            title: data.title,
            description: data.description,
          },
        });

  
        function chunkArray<T>(arr: T[], size = 100) {
          const chunks: T[][] = [];
          for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
          }
          return chunks;
        }

        for (const module of data.modules) {
          const createdModule = await tx.module.create({
            data: {
              title: module.title,
              trackId: data.id,
            },
          });
          if (module.items && module.items.length > 0) {
            const itemsToCreate = module.items.map((item) => ({
              title: item.title,
              link: item.link || null,
              moduleId: createdModule.id,
            }));

            const chunks = chunkArray(itemsToCreate, 200);
            for (const chunk of chunks) {
              await tx.roadmapItem.createMany({ data: chunk });
            }
          }
        }
      },
      { timeout: 30000 },
    );

    
    revalidatePath("/dashboard/tracks");
    revalidatePath("/admin/tracks");
  } catch (error) {
    console.error("Error updating track:", error);
    throw new Error(`Failed to update track: ${(error as Error).message}`);
  }
}

export async function deleteTrack(trackId: string) {
  await requireAdmin();

  try {

    await db.progress.deleteMany({
      where: {
        item: {
          module: {
            trackId: trackId,
          },
        },
      },
    });

    await db.roadmapItem.deleteMany({
      where: {
        module: {
          trackId: trackId,
        },
      },
    });

  
    await db.module.deleteMany({
      where: {
        trackId: trackId,
      },
    });


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
