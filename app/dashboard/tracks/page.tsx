import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Goal, Target } from "lucide-react";

async function LearningTracks() {
  const user = await getCurrentUser();

  if (!user) return null;

  const tracks = await db.track.findMany({
    include: {
      modules: {
        include: {
          items: {
            include: {
              progress: {
                where: { userId: user.id },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-8 lg:grid-cols-3 gap-6">
      {tracks.map((track) => {
        const totalItems = track.modules.reduce(
          (acc, module) => acc + module.items.length,
          0,
        );
        const completedItems = track.modules.reduce(
          (acc, module) =>
            acc +
            module.items.filter((item) =>
              item.progress.some((p) => p.status === "COMPLETED"),
            ).length,
          0,
        );
        const progressPercentage =
          totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

        return (
          <Card
            key={track.id}
            className="hover:shadow-lg transition-shadow bg-[#211f24] border-1 border-[#36343a] shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-[#e6e1e9] text-lg">
                {track.title}
              </CardTitle>
              <p className="text-sm text-[#cac4cf]">{track.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mt-3 md:mt-0 mb-2">
                  <span className="text-[#e6e1e9]">Progress</span>
                  <span className="text-[#e6e1e9] text-xs font-medium">
                    {completedItems}/{totalItems}
                  </span>
                </div>
                <Progress value={progressPercentage} />
              </div>
              <Button
                asChild
                className="w-full button-primary text-[#492533] rounded-full mt-2 py-5"
              >
                <Link href={`/dashboard/track/${track.id}`}>
                  Continue Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-[#141318]">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <Goal className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Roadmaps
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Select your Preffered Roadmap
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Cards */}

      <Suspense fallback={<LoadingSpinner />}>
        <LearningTracks />
      </Suspense>

      {/* Bottom Section */}
      <div className="mt-6 md:mt-12 md:text-center px-6 md:px-8">
        <div className="p-6 md:p-8 bg-gradient-to-r bg-[#211f24] rounded-3xl border border-[#36343a] backdrop-blur-sm">
          <h3 className="text-xl font-bold text-[#e6e1e9] mb-3">
            Something not right in the Roadmap?
          </h3>
          <p className="text-[#cac4cf]">
            Mail us at{" "}
            <span className="text-[#efb8c9] font-bold">
              pixelperfect317@gmail.com
            </span>{" "}
            and specify changes, improvements and additions that can be done to
            our Roadmaps.
          </p>
        </div>
      </div>
    </div>
  );
}
