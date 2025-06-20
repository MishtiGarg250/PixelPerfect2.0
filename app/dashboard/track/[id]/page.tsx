import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { CheckCircle, Circle, ExternalLink, ArrowLeft } from "lucide-react"
import { ProgressToggle } from "@/components/progress-toggle"
import Link from "next/link"
import ComingSoon from "@/components/coming-soon"

async function TrackDetails({ trackId }: { trackId: string }) {
  const user = await getCurrentUser()
  console.log(trackId)
  if(trackId==="web" || trackId==="cp"){
    return <ComingSoon/>
  }
  if (!user || !trackId) return notFound()

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
  })

  if (!track) {
    notFound()
  }

  const totalItems = track.modules.reduce((acc, module) => acc + module.items.length, 0)
  const completedItems = track.modules.reduce(
    (acc, module) => acc + module.items.filter((item) => item.progress.some((p) => p.status === "COMPLETED")).length,
    0,
  )
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Back Button */}
      <Link href="/tracks">
        <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tracks
        </Button>
      </Link>

      {/* Main Track Info Card */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 rounded-t-lg">
          <CardTitle className="text-3xl text-white">{track.title}</CardTitle>
          <p className="text-gray-300 text-lg">{track.description}</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-300">
              <span className="font-medium">Overall Progress</span>
              <span className="text-[#b5b5f6]">
                {completedItems}/{totalItems} completed
              </span>
            </div>
            <div className="relative">
              <Progress value={progressPercentage} className="h-3 bg-gray-800" />
              <div
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-right text-sm text-[#f7bff4] font-medium">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <div className="space-y-6">
        {track.modules.map((module, moduleIndex) => (
          <Card key={module.id} className="bg-gray-900/30 border-gray-700 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] flex items-center justify-center text-black font-bold text-sm">
                  {moduleIndex + 1}
                </div>
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {module.items.map((item, itemIndex) => {
                  const userProgress = item.progress[0]
                  const status = userProgress?.status || "NOT_STARTED"

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {status === "COMPLETED" ? (
                            <CheckCircle className="h-6 w-6 text-[#b5b5f6]" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-400 font-mono">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-white">{item.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              status === "COMPLETED"
                                ? "bg-[#b5b5f6]/20 text-[#b5b5f6] border-[#b5b5f6]/30"
                                : status === "IN_PROGRESS"
                                  ? "bg-[#f7bff4]/20 text-[#f7bff4] border-[#f7bff4]/30"
                                  : "bg-gray-700/50 text-gray-400 border-gray-600"
                            }
                          >
                            {status.replace("_", " ").toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="bg-transparent border-[#b5b5f6]/30 text-[#b5b5f6] hover:bg-[#b5b5f6]/10 hover:border-[#b5b5f6]"
                          >
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <ProgressToggle itemId={item.id} currentStatus={status} userId={user.id} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params

  return (
    <div className="min-h-screen bg-black text-white">
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
  )
}
