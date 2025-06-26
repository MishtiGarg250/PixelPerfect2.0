import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  BookOpen,
  FileText,
  Heart,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";

async function DashboardStats() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [totalProgress, completedItems, likedArticles, userComments] =
    await Promise.all([
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
    ]);

  const stats = [
    {
      title: "Progress",
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
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-8 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            className="bg-[#211f24] border-1 border-[#2b292f]"
            key={stat.title}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#e7e0e8]">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-[#d2bcfd] " />
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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#151218]">
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Dashboard
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Track all your Progress on Pixel Perfect
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
}
