import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { Plus, Edit, FileText, Sparkles, Calendar, Heart, MessageCircle } from "lucide-react";
import { DeleteArticleButton } from "@/components/delete-article-button";

async function ArticlesList() {
  const articles = await db.articles.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
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
      <Card className="bg-[#211f24] border-[#2b292f]">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-[#2b292f] rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#938f99]" />
          </div>
          <p className="text-[#cac4cf] mb-4">No articles found</p>
          <Button
            asChild
            className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-[#141318] hover:from-[#c5c5f8] hover:to-[#f8cff6] rounded-xl"
          >
            <Link href="/admin/articles/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Article
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <Card
          className="bg-[#211f24] border-[#2b292f] hover:border-[#b5b5f6]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#b5b5f6]/5"
          key={article.id}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-[#e6e1e9] truncate">
                    {article.title}
                  </h3>
                  <Badge className="bg-[#cebdfe]/15 text-[#cebdfe] border-[#cebdfe]/30 rounded-full">
                    {article.category}
                  </Badge>
                </div>

                <p className="text-sm text-[#938f99] mb-3 line-clamp-2">
                  {article.content.substring(0, 150)}...
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#cac4cf]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                  <span>by {article.author.name}</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#efb8c9]" />
                    {article._count.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-[#cebdfe]" />
                    {article._count.comments}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-transparent border-[#36343a] text-[#cac4cf] hover:bg-[#2b292f] hover:text-[#e6e1e9] hover:border-[#b5b5f6]/50 rounded-xl"
                >
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <DeleteArticleButton
                  articleId={article.id}
                  articleTitle={article.title}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminArticlesPage() {
  return (
    <div className="min-h-screen bg-[#151218]">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Manage Articles
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Create and manage your articles
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col mb-8 md:flex-row mx-6 md:mx-8 md:items-center justify-between gap-4 p-4 bg-[#211f24] rounded-2xl border border-[#36343a]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#cebdfe]" />
          <span className="text-[#cac4cf]">
            Create engaging content for your users
          </span>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-[#141318] hover:from-[#c5c5f8] hover:to-[#f8cff6] rounded-xl transition-all duration-300 hover:scale-105"
        >
          <Link href="/admin/articles/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      {/* Articles List */}
      <div className="px-6 md:px-8 pb-8">
        <Suspense fallback={<LoadingSpinner />}>
          <ArticlesList />
        </Suspense>
      </div>
    </div>
  );
}