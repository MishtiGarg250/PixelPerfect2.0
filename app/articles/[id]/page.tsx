import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react"
import { LikeButton } from "@/components/like-button"
import { CommentSection } from "@/components/comment-section"
import { ShareButton } from "@/components/share-button"
import { formatDistanceToNow } from "date-fns"

async function ArticleContent({ articleId }: { articleId: string }) {
  const user = await getCurrentUser()

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
  })

  if (!article) {
    notFound()
  }

  const isLiked = user ? article.likes.length > 0 : false
  const readTime = Math.ceil(article.content.split(" ").length / 200) // Estimate reading time

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Navigation */}
      <Link href="/articles">
        <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
      </Link>

      {/* Main Article Card */}
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden">
        <CardHeader className="p-0">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 w-full bg-gradient-to-br from-[#b5b5f6]/20 to-[#f7bff4]/20">
            {
              <Image
                src={"/android-dark.jpg"}
                alt={article.title}
                fill
                className="object-cover"
              />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Article Meta Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#b5b5f6]/20 text-[#b5b5f6] border-[#b5b5f6]/30 backdrop-blur-sm">
                  {article.category}
                </Badge>
                <div className="flex items-center text-sm text-gray-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {readTime} min read
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">{article.title}</h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <Avatar className="h-12 w-12 border-2 border-[#b5b5f6]/30">
              <AvatarImage src={article.author.imageUrl || ""} />
              <AvatarFallback className="bg-[#b5b5f6]/20 text-[#b5b5f6]">
                {article.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white text-lg">{article.author.name}</p>
              <p className="text-gray-400">Author</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-8">
            <div className="text-gray-300 leading-relaxed space-y-6">
              {article.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-lg leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Engagement Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-700">
            <div className="flex items-center gap-4">
              <LikeButton articleId={article.id} initialLiked={isLiked} initialCount={article._count.likes} />
              <ShareButton title={article.title} url={`/articles/${article.id}`} />
            </div>

            {/* Article Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{article._count.likes} likes</span>
              <span>•</span>
              <span>{article._count.comments} comments</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      
        <CommentSection articleId={article.id} />
      
    </div>
  )
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-black text-white">
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
          <ArticleContent articleId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
