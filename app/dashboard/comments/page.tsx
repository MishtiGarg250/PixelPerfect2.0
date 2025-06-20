import { auth } from "@clerk/nextjs/server"
import { db} from "@/lib/db"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Calendar, BookOpen, ArrowRight, Sparkles } from "lucide-react"

export default async function CommentedArticlesPage() {
  const { userId } = await auth()

  if (!userId) return redirect("/sign-in")

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  })

  if (!user) return redirect("/sign-in")

  // Get comments by user and fetch the associated article and author
  const userComments = await db.like.findMany({
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
  })

  // Create a unique list of articles (avoid duplicates if multiple comments exist)
  const uniqueArticlesMap = new Map()
  userComments.forEach((comment) => {
    uniqueArticlesMap.set(comment.article.id, comment.article)
  })

  const uniqueArticles = Array.from(uniqueArticlesMap.values())

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

      <div className="relative z-10 py-10 px-4 md:px-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Commented Articles
              </h1>
              <p className="text-gray-400 mt-1">Articles where you've shared your thoughts</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-[#b5b5f6]/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#f7bff4]" />
              <span className="text-lg font-semibold text-white">{uniqueArticles.length}</span>
              <span className="text-gray-400">Articles Commented</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#b5b5f6]" />
              <span className="text-gray-400">Keep engaging with the community!</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {uniqueArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full flex items-center justify-center mb-6 border border-gray-700/50">
              <MessageCircle className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Comments Yet</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start engaging with our community by commenting on articles that interest you. Your insights and
              discussions will appear here.
            </p>
            <Link href="/articles">
              <Button className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full px-8">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Articles
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {uniqueArticles.map((article, index) => (
              <Card
                key={article.id}
                className="group relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 backdrop-blur-sm hover:border-[#b5b5f6]/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl rounded-2xl overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 to-[#f7bff4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Comment Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>

                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30 mb-4">
                    <span className="text-xs font-medium text-[#b5b5f6]">{article.category}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/articles/${article.id}`}>
                    <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-[#b5b5f6] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
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
                        <p className="text-sm font-medium text-white">{article.author.name}</p>
                        <p className="text-xs text-gray-400">Author</p>
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

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Action */}
        {uniqueArticles.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/articles">
              <Button
                variant="outline"
                className="border-[#b5b5f6]/30 text-[#b5b5f6] hover:bg-[#b5b5f6]/10 hover:border-[#b5b5f6]/50 transition-all duration-300 transform hover:scale-105 rounded-full px-8"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Discover More Articles
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
