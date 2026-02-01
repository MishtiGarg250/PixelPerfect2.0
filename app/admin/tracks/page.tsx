import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { Plus, Edit, Users } from "lucide-react";
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

  return (
    <div className="space-y-4">
      {tracks.length === 0 ? (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">
              No learning tracks found.
            </p>
            <Button className="button-primary" asChild>
              <Link href="/admin/tracks/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Track
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        tracks.map((track) => {
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
              className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-white">
                      {track.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {track.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="secondary">
                        {track.modules.length} modules
                      </Badge>
                      <Badge variant="outline" className="text-white">
                        {totalItems} items
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {totalProgress} enrollments
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-300">Modules:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {track.modules.map((module) => (
                      <div
                        key={module.id}
                        className="bg-gray-900/50 text-sm p-2 rounded border border-gray-800"
                      >
                        <span className="text-white font-medium">
                          {module.title}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          ({module.items.length} items)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

export default function AdminTracksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white font-bold">
            Manage Learning Tracks
          </h1>
          <p className="text-muted-foreground">
            Create and manage your learning tracks.
          </p>
        </div>
        <Button asChild className="button-primary">
          <Link href="/admin/tracks/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Track
          </Link>
        </Button>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <TracksList />
      </Suspense>
    </div>
  );
}