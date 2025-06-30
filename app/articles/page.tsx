import { Suspense } from "react";
import { ArticleCardPage } from "@/components/article-card-page";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { BookOpen, TrendingUp } from "lucide-react";

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
  });

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <BookOpen className="h-16 w-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          No articles yet
        </h3>
        <p className="text-gray-500">Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-8 lg:grid-cols-4 gap-8">
      {articles.map((article) => (
        
          <ArticleCardPage key={article.id} article={article} />
        
      ))}
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#141318] text-[#e6e1e9]">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              All Articles
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Explore Articles from Pixel Perfect
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col mb-8 md:flex-row mx-6 md:mx-8 md:items-center gap-3 md:gap-6 p-4 bg-[#211f24] rounded-2xl border border-[#36343a] backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#cebdfe]" />
          <span className="text-[#cac4cf]">Latest content Updated Daily!</span>
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
  );
}
