import { Suspense } from "react"
import { ArticleCard } from "@/components/article-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { BookOpen, TrendingUp } from "lucide-react"

async function ArticlesList() {
  const articles = await db.articles.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  })

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="h-16 w-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No articles yet</h3>
        <p className="text-gray-500">Check back later for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] h-2"></div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30">
              <BookOpen className="h-8 w-8 text-[#b5b5f6]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent">
                All Articles
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                Explore our collection of articles on web development and technology.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#f7bff4]" />
              <span className="text-sm text-gray-300">Latest content updated daily</span>
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner />
            </div>
          }
        >
          <ArticlesList />
        </Suspense>
      </div>
    </div>
  )
}
