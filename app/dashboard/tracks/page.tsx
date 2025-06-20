import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { Target } from "lucide-react"

async function LearningTracks() {
  const user = await getCurrentUser()

  if (!user) return null

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
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {tracks.map((track) => {
        const totalItems = track.modules.reduce((acc, module) => acc + module.items.length, 0)
        const completedItems = track.modules.reduce(
          (acc, module) =>
            acc + module.items.filter((item) => item.progress.some((p) => p.status === "COMPLETED")).length,
          0,
        )
        const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

        return (
          <Card key={track.id} className="hover:shadow-lg transition-shadow bg-gray-900 border-2 border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">{track.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{track.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">Progress</span>
                  <span className="text-white text-xs font-medium">
                    {completedItems}/{totalItems}
                  </span>
                </div>
                <Progress  value={progressPercentage} />
              </div>
              <Button asChild className="w-full button-primary text-black">
                <Link href={`/dashboard/track/${track.id}`}>Continue Learning</Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>
      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Choose Your Roadmap
              </h1>
              <p className="text-gray-400 mt-1">Select a learning track to continue your journey</p>
            </div>
          </div>
        </div>

        {/* Roadmap Cards */}
        
 <Suspense fallback={<LoadingSpinner />}>
        <LearningTracks />
      </Suspense>
        

        {/* Bottom Section */}
        <div className="mt-12 text-center">
          <div className="p-8 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-3xl border border-[#b5b5f6]/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Need a custom roadmap?</h3>
            <p className="text-gray-400 mb-6">Get personalized learning paths based on your goals</p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Target className="w-4 h-4 text-[#b5b5f6]" />
                <span>Goal-Based Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


