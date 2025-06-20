import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { BookOpen, FileText, Heart, MessageCircle } from "lucide-react"

async function DashboardStats() {
  const user = await getCurrentUser()

  if (!user) return null

  const [totalProgress, completedItems, likedArticles, userComments] = await Promise.all([
    db.progress.count({
      where: { userId: user.id },
    }),
    db.progress.count({
      where: {
        userId: user.id,
        status: "COMPLETED",
      },
    }),
    db.like.count({
      where: { userId: user.id },
    }),
    db.comment.count({
      where: { userId: user.id },
    }),
  ])

  const stats = [
    {
      title: "Learning Progress",
      value: `${completedItems}/${totalProgress}`,
      icon: BookOpen,
      description: "Items completed",
    },
    {
      title: "Articles Read",
      value: likedArticles,
      icon: FileText,
      description: "Articles liked",
    },
    {
      title: "Liked Articles",
      value: likedArticles,
      icon: Heart,
      description: "Total likes given",
    },
    {
      title: "Comments",
      value: userComments,
      icon: MessageCircle,
      description: "Comments posted",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card className="bg-gray-900/50 border-1 border-gray-900" key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-[#b5b5f6] " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#b5b5f6]">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      
      <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <DashboardStats />
      </Suspense>
    </div>
    </div>
    
  )
}
