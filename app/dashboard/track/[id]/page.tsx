import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { CheckCircle, Circle, ExternalLink, ArrowLeft } from "lucide-react";
import { ProgressToggle } from "@/components/progress-toggle";
import Link from "next/link";
import ComingSoon from "@/components/coming-soon";

async function TrackDetails({ trackId }: { trackId: string }) {
  const user = await getCurrentUser();
  console.log(trackId);
  if (trackId === "web" || trackId === "cp") {
    return <ComingSoon />;
  }
  if (!user || !trackId) return notFound();

  const track = await db.track.findUnique({
    where: { id: trackId },
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

  if (!track) {
    notFound();
  }

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
    <div className="container mx-auto px-6 pt-12 md:pt-8 md:px-8 pb-6 md:pb-8 space-y-6 bg-[#141318]">
      {/* Back Button */}
      <Link href="/dashboard/tracks">
        <Button
          variant="ghost"
          className="text-[#e6e1e9] hover:text-[#cebdfe] hover:bg-transparent my-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tracks
        </Button>
      </Link>

      {/* Main Track Info Card */}
      <Card className="relative bg-[#211f24] border-[#36343a] md:px-3 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/track_back.png')` }}
        />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-[30px] md:text-4xl text-[#141318]">
              {track.title}
            </CardTitle>
            <p className="text-[#3a383e] text-sm md:text-lg">
              {track.description}
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-[#141318]">
                <span className="font-medium">Overall Progress</span>
                <span>
                  {completedItems}/{totalItems} Completed
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={progressPercentage}
                  className="h-3 md:h-8 border-2 border-[#36343a] bg-[#211f24]"
                />
              </div>
              <div className="text-right text-sm text-[#141318] font-bold">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Modules */}
      <div className="space-y-4 md:space-y-6">
        {track.modules.map((module, moduleIndex) => (
          <Card
            key={module.id}
            className="bg-transparent border-[#3a383e] backdrop-blur-sm"
          >
            <CardHeader className="border-b border-[#3a383e]">
              <CardTitle className="text-[16px] md:text-2xl text-[#e6e1e9] flex items-center md:gap-3">
                <div className="w-8 h-8 rounded-full mr-2 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] flex items-center justify-center text-black font-bold text-sm">
                  {moduleIndex + 1}
                </div>
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4 md:mt-0">
                {module.items.map((item, itemIndex) => {
                  const userProgress = item.progress[0];
                  const status = userProgress?.status || "NOT_STARTED";

                  return (
                    <div
                      key={item.id}
                      className="flex md:items-center md:flex-row flex-col justify-between p-4 bg-[#211f24] border border-[#36343a] rounded-xl hover:bg-[#3a383e] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {status === "COMPLETED" ? (
                            <CheckCircle className="h-6 w-6 text-[#b5b5f6]" />
                          ) : (
                            <Circle className="h-6 w-6 text-[#938f99]" />
                          )}
                          <span className="text-sm text-[#938f99] font-mono">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[14px] md:text-[16px] font-medium text-[#e6e1e9]">
                            {item.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className={
                              status === "COMPLETED"
                                ? "bg-[#4c3e76] text-[#e8ddff] border-transparent"
                                : status === "IN_PROGRESS"
                                  ? "bg-[#633b49] text-[#ffd9e3] border-transparent"
                                  : "bg-[#48454e] text-[#cac4cf] border-transparent"
                            }
                          >
                            {status.replace("_", " ").toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex ml-auto mt-8 md:mt-0 md:ml-0 items-center gap-3">
                        {item.link && (
                          <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="rounded-full bg-transparent p-5 border-[#cebdfe]/40 text-[#cebdfe] hover:text-[#cbc3dc] hover:bg-[#b5b5f6]/10 hover:border-[#cbc3dc]"
                          >
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Go to Resource{" "}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <ProgressToggle
                          itemId={item.id}
                          currentStatus={status}
                          userId={user.id}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#141318] text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] h-2"></div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <LoadingSpinner />
          </div>
        }
      >
        <TrackDetails trackId={id} />
      </Suspense>
    </div>
  );
}
