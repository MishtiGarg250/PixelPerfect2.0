import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { Plus, Edit, Trash2 } from "lucide-react"

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
  })

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card className="bg-gray-900/50 border border-gray-900 backdrop-blur-sm"key={article.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg text-white">{article.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-gradient-to-bl from-[#b5b5f4] to-[#f7bff4]">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground">by {article.author.name}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{article.content.substring(0, 200)}...</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{article._count.likes} likes</span>
              <span>{article._count.comments} comments</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AdminArticlesPage() {
  return (
    <div className="space-y-6 h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Articles</h1>
          <p className="text-muted-foreground">Create and manage your articles.</p>
        </div>
        <Button className="button-primary" asChild>
          <Link href="/admin/articles/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <ArticlesList />
      </Suspense>
    </div>
  )
}
