import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { Plus, Edit, BookOpen, Users, Sparkles, Layers } from "lucide-react";
import { DeleteTrackButton } from "@/components/delete-track-button";

async function TracksList() {
  const tracks = await db.track.findMany({
    orderBy: { title: "asc" },
    include: {
      modules: {
        include: {
          items: {
            include: {
              progress: true,
            },
          },
        },
      },
    },
  });

  if (tracks.length === 0) {
    return (
      <Card className="bg-[#211f24] border-[#2b292f]">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-[#2b292f] rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-[#938f99]" />
          </div>
          <p className="text-[#cac4cf] mb-4">No learning tracks found</p>
          <Button
            asChild
            className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-[#141318] hover:from-[#c5c5f8] hover:to-[#f8cff6] rounded-xl"
          >
            <Link href="/admin/tracks/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Track
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tracks.map((track, index) => {
        const totalItems = track.modules.reduce(
          (acc, module) => acc + module.items.length,
          0
        );
        const totalProgress = track.modules.reduce(
          (acc, module) =>
            acc +
            module.items.reduce(
              (itemAcc, item) => itemAcc + item.progress.length,
              0
            ),
          0
        );

        return (
          <Card
            key={track.id}
            className="bg-[#211f24] border-[#2b292f] hover:border-[#b5b5f6]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#b5b5f6]/5"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#e6e1e9]">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#938f99] mb-3 line-clamp-2">
                    {track.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge className="bg-[#cebdfe]/15 text-[#cebdfe] border-[#cebdfe]/30 rounded-full">
                      <Layers className="w-3 h-3 mr-1" />
                      {track.modules.length} modules
                    </Badge>
                    <Badge className="bg-[#efb8c9]/15 text-[#efb8c9] border-[#efb8c9]/30 rounded-full">
                      {totalItems} items
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-[#cac4cf]">
                      <Users className="w-3 h-3" />
                      {totalProgress} enrollments
                    </div>
                  </div>

                  {/* Modules Preview */}
                  <div className="flex flex-wrap gap-2">
                    {track.modules.slice(0, 3).map((module) => (
                      <span
                        key={module.id}
                        className="text-xs bg-[#2b292f] text-[#cac4cf] px-3 py-1 rounded-full"
                      >
                        {module.title}
                      </span>
                    ))}
                    {track.modules.length > 3 && (
                      <span className="text-xs bg-[#2b292f] text-[#938f99] px-3 py-1 rounded-full">
                        +{track.modules.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-transparent border-[#36343a] text-[#cac4cf] hover:bg-[#2b292f] hover:text-[#e6e1e9] hover:border-[#b5b5f6]/50 rounded-xl"
                  >
                    <Link href={`/admin/tracks/${track.id}/edit`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <DeleteTrackButton
                    trackId={track.id}
                    trackTitle={track.title}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default function AdminTracksPage() {
  return (
    <div className="min-h-screen bg-[#151218]">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Learning Tracks
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Create and manage learning roadmaps
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col mb-8 md:flex-row mx-6 md:mx-8 md:items-center justify-between gap-4 p-4 bg-[#211f24] rounded-2xl border border-[#36343a]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#cebdfe]" />
          <span className="text-[#cac4cf]">
            Build structured learning paths for users
          </span>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-[#141318] hover:from-[#c5c5f8] hover:to-[#f8cff6] rounded-xl transition-all duration-300 hover:scale-105"
        >
          <Link href="/admin/tracks/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Track
          </Link>
        </Button>
      </div>

      {/* Tracks List */}
      <div className="px-6 md:px-8 pb-8">
        <Suspense fallback={<LoadingSpinner />}>
          <TracksList />
        </Suspense>
      </div>
    </div>
  );
}