import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { LikeButton } from "@/components/like-button";
import { CommentSection } from "@/components/comment-section";
import { ShareButton } from "@/components/share-button";
import { formatDistanceToNow } from "date-fns";

async function ArticleContent({ articleId }: { articleId: string }) {
  const user = await getCurrentUser();

  const article = await db.articles.findUnique({
    where: { id: articleId },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      likes: user
        ? {
            where: { userId: user.id },
          }
        : false,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  if (!article) {
    notFound();
  }

  const isLiked = user ? article.likes.length > 0 : false;
  const readTime = Math.ceil(article.content.split(" ").length / 200);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Navigation */}
      <Link href="/articles">
        <Button
          variant="ghost"
          className="text-[#e6e1e9] hover:text-[#cebdfe] hover:bg-transparent mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
      </Link>

      {/* Main Article Card */}
      <Card className="bg-[#211f24] border-[#36343a] backdrop-blur-sm overflow-hidden p-0">
        {/* Featured Image */}
        <div className="relative aspect-video bg-gradient-to-br md:mt-[-24px] from-[#b5b5f6]/20 to-[#f7bff4]/20">
          {
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          }
          <div className="absolute top-4 md:top-6 right-4 md:right-6">
            <Badge className=" bg-[#cebdfe]/20 text-[#cebdfe] rounded-full px-4 py-2 border-[#cebdfe]/30 backdrop-blur-sm">
              {article.category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#201f24] via-transparent to-transparent" />

          {/* Article Meta Overlay */}
          <div className="absolute bottom-6 left-4 md:left-6 right-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-[#cac4cf] bg-[#141318] px-4 py-2 rounded-full backdrop-blur-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDistanceToNow(new Date(article.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <div className="flex items-center text-sm text-[#cac4cf] bg-[#141318] px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-1" />
                {readTime} min read
              </div>
            </div>
          </div>
        </div>

        <CardContent className="px-5 md:px-8">
          {/* Article Title */}
          <h1 className="text-[24px] md:text-4xl font-bold mb-5 md:mb-8 text-white leading-tight">
            {article.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-5 md:mb-8 p-4 bg-[#36343a] rounded-xl border border-[#938f99]/50">
            <Avatar className="h-12 w-12 border-2 border-[#938f99]/50">
              <AvatarImage src={article.author.imageUrl || ""} />
              <AvatarFallback className="bg-[#b5b5f6]/20 text-[#b5b5f6]">
                {article.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-[#e6e1e9] text-lg">
                {article.author.name}
              </p>
              <p className="text-[#cac4cf]">Author</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-5 md:mb-8">
            <div className="text-[#e6e1e9] leading-relaxed space-y-6">
              {article.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-[16px] md:text-lg leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Engagement Actions */}
          <div className="flex-col items-center md:flex-row justify-between pt-5 md:pt-8 border-t border-[#36343a]">
            <div className="flex items-center mb-5 md:mb-0 gap-4">
              <LikeButton
                articleId={article.id}
                initialLiked={isLiked}
                initialCount={article._count.likes}
              />
              <ShareButton
                title={article.title}
                url={`/articles/${article.id}`}
              />
            </div>

            {/* Article Stats */}
            <div className="flex items-center gap-4 mb-5 md:mb-0 text-md text-[#cac4cf]">
              <span>{article._count.likes} Likes</span>
              <span>•</span>
              <span>{article._count.comments} Comments</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}

      <CommentSection articleId={article.id} />
    </div>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-[#141318] text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] h-2"></div>

      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <LoadingSpinner />
            </div>
          }
        >
          <ArticleContent articleId={id} />
        </Suspense>
      </div>
    </div>
  );
}
