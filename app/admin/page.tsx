import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import {
  FileText,
  BookOpen,
  Users,
  MessageCircle,
  Shield,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";

async function AdminStats() {
  const [totalArticles, totalTracks, totalUsers, totalComments] =
    await Promise.all([
      db.articles.count(),
      db.track.count(),
      db.user.count(),
      db.comment.count(),
    ]);

  const stats = [
    {
      title: "Total Articles",
      value: totalArticles,
      icon: FileText,
      description: "Published articles",
    },
    {
      title: "Learning Tracks",
      value: totalTracks,
      icon: BookOpen,
      description: "Active roadmaps",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageCircle,
      description: "User discussions",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-8 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            className="bg-[#211f24] border-1 border-[#2b292f] hover:border-[#b5b5f6]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#b5b5f6]/10"
            key={stat.title}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#e7e0e8]">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-[#d2bcfd]" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#d2bcfd]">
                {stat.value}
              </div>
              <p className="text-xs mt-2 text-[#cbc4cf]">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

async function RecentActivity() {
  const recentArticles = await db.articles.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const recentComments = await db.comment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true },
      },
      article: {
        select: { title: true },
      },
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-6 md:px-8 gap-6 mt-8">
      {/* Recent Articles */}
      <Card className="bg-[#211f24] border-[#2b292f]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-[#e6e1e9] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#d2bcfd]" />
              Recent Articles
            </CardTitle>
            <span className="text-xs text-[#938f99] bg-[#36343a] px-2 py-1 rounded-full">
              Last 5
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentArticles.length === 0 ? (
            <p className="text-[#938f99] text-sm text-center py-4">
              No articles yet
            </p>
          ) : (
            recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-3 bg-[#2b292f] rounded-xl hover:bg-[#36343a] transition-colors duration-200"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#e6e1e9] truncate">
                    {article.title}
                  </p>
                  <p className="text-xs text-[#938f99]">
                    by {article.author.name}
                  </p>
                </div>
                <span className="text-xs text-[#cebdfe] bg-[#cebdfe]/10 px-2 py-1 rounded-full ml-2">
                  {article.category}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Comments */}
      <Card className="bg-[#211f24] border-[#2b292f]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-[#e6e1e9] flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#efb8c9]" />
              Recent Comments
            </CardTitle>
            <span className="text-xs text-[#938f99] bg-[#36343a] px-2 py-1 rounded-full">
              Last 5
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentComments.length === 0 ? (
            <p className="text-[#938f99] text-sm text-center py-4">
              No comments yet
            </p>
          ) : (
            recentComments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center justify-between p-3 bg-[#2b292f] rounded-xl hover:bg-[#36343a] transition-colors duration-200"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#e6e1e9] truncate">
                    {comment.body.substring(0, 50)}
                    {comment.body.length > 50 ? "..." : ""}
                  </p>
                  <p className="text-xs text-[#938f99]">
                    by {comment.user.name} on "{comment.article.title}"
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#151218]">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Admin Overview
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Manage your Pixel Perfect platform
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col mb-8 md:flex-row mx-6 md:mx-8 md:items-center gap-3 md:gap-6 p-4 bg-[#211f24] rounded-2xl border border-[#36343a] backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" />
          <span className="text-[#cac4cf]">System Status:</span>
          <span className="text-green-400 font-medium">All Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#cebdfe]" />
          <span className="text-[#cac4cf]">
            Full administrative access enabled
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-8 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-[#211f24] border-[#2b292f]">
                <CardContent className="p-6 flex items-center justify-center">
                  <LoadingSpinner />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <AdminStats />
      </Suspense>

      {/* Recent Activity */}
      <Suspense fallback={<LoadingSpinner />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}