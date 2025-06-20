import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { FileText, BookOpen, Users, MessageCircle, TrendingUp, Activity } from "lucide-react"

async function AdminStats() {
  const [totalArticles, totalTracks, totalUsers, totalComments] = await Promise.all([
    db.articles.count(),
    db.track.count(),
    db.user.count(),
    db.comment.count(),
  ])

  const stats = [
    {
      title: "Total Articles",
      value: totalArticles,
      icon: FileText,
      color: "from-[#b5b5f6] to-[#b5b5f6]/70",
      bgColor: "bg-[#b5b5f6]/10",
      iconColor: "text-[#b5b5f6]",
      change: "+12%",
      changeType: "increase" as const,
    },
    {
      title: "Learning Tracks",
      value: totalTracks,
      icon: BookOpen,
      color: "from-[#f7bff4] to-[#f7bff4]/70",
      bgColor: "bg-[#f7bff4]/10",
      iconColor: "text-[#f7bff4]",
      change: "+8%",
      changeType: "increase" as const,
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "from-[#b5b5f6] to-[#f7bff4]",
      bgColor: "bg-gradient-to-br from-[#b5b5f6]/10 to-[#f7bff4]/10",
      iconColor: "text-[#b5b5f6]",
      change: "+24%",
      changeType: "increase" as const,
    },
    {
      title: "Total Comments",
      value: totalComments,
      icon: MessageCircle,
      color: "from-[#f7bff4] to-[#b5b5f6]",
      bgColor: "bg-gradient-to-br from-[#f7bff4]/10 to-[#b5b5f6]/10",
      iconColor: "text-[#f7bff4]",
      change: "+18%",
      changeType: "increase" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 hover:border-[#b5b5f6]/30 hover:shadow-lg hover:shadow-[#b5b5f6]/10 group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}>
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</div>
              {/* <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-sm font-medium text-green-400">{stat.change}</span>
                </div>
                <span className="text-xs text-gray-500">vs last month</span>
              </div> */}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}



export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] h-2"></div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30">
              <Activity className="h-8 w-8 text-[#b5b5f6]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent">
                Admin Overview
              </h1>
              <p className="text-gray-400 text-lg mt-2">Manage your learning platform from here.</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">System Status: All services operational</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner />
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <AdminStats />
        </Suspense>

          
      </div>
    </div>
  )
}