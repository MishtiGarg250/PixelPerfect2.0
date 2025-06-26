import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  Calendar,
  BookOpen,
  ArrowRight,
  Sparkles,
  Filter,
  Search,
} from "lucide-react";

export default async function LikedArticlesPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return redirect("/sign-in");
  }

  const likedArticles = await db.like.findMany({
    where: { userId: user.id },
    include: {
      article: {
        include: {
          author: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#141318] text-white w-full">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Liked Articles
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Your favorite reads and Bookmarked Content
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col md:flex-row mx-6 md:mx-8 md:items-center gap-3 md:gap-6 p-4 bg-[#211f24] rounded-2xl border border-[#36343a] backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#efb8c9]" />
          <span className="text-lg font-semibold text-white">
            {likedArticles.length}
          </span>
          <span className="text-[#cac4cf]">Liked Articles</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#cebdfe]" />
          <span className="text-[#cac4cf]">
            Keep discovering amazing content!
          </span>
        </div>
      </div>

      {/* Action Buttons */}

      {/* Content */}
      {likedArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-[#211f24] rounded-full flex items-center justify-center mb-6 border border-[#36343a]">
            <Heart className="w-12 h-12 text-[#938f99]" />
          </div>
          <h3 className="text-2xl font-semibold text-[#e6e1e9] mb-2">
            No Liked Articles Yet
          </h3>
          <p className="text-[#cac4cf] text-center mx-12 md:max-w-xl mb-6">
            Start exploring our amazing content and like articles that interest
            you. They'll appear here for easy access later.
          </p>
          <Link href="/articles">
            <Button className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full px-8">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Articles
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 mt-8 px-6 md:px-8 lg:grid-cols-3">
          {likedArticles.map((like, index) => {
            const article = like.article;
            return (
              <Card
                key={article.id}
                className="group relative p-6 bg-[#211f24] border border-[#36343a] backdrop-blur-sm hover-bg-[#36343a] hover:bg-[#36343a] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl rounded-2xl overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Heart Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#efb8c9] rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 text-[#492533] fill-current" />
                </div>

                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#cebdfe]/15 border border-[#cebdfe]/30 mb-4">
                    <span className="text-xs font-medium text-[#cebdfe]">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/articles/${article.id}`}>
                    <h2 className="text-xl font-semibold mb-3 text-[#e6e1e9] group-hover:text-[#b5b5f6] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4 text-[#cac4cf]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-[#b5b5f6]/20">
                        <AvatarImage src={article.author.imageUrl || ""} />
                        <AvatarFallback className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-white font-semibold">
                          {article.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-[#e6e1e9]">
                          {article.author.name}
                        </p>
                        <p className="text-xs text-[#cac4cf]">Author</p>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link href={`/articles/${article.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 hover:from-[#b5b5f6]/30 hover:to-[#f7bff4]/30 text-white border border-[#b5b5f6]/30 hover:border-[#b5b5f6]/50 transition-all duration-300 rounded-full"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Bottom Action */}
      {likedArticles.length > 0 && (
        <div className="my-8 text-center">
          <Link href="/articles">
            <Button
              size="lg"
              className="button-primary text-black transition-all duration-300 transform hover:scale-105 rounded-full py-5"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Discover More Articles
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
