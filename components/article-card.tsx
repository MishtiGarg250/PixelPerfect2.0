import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Clock, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Article {
  id: string
  title: string
  excerpt?: string
  imageUrl: string|null
  createdAt: Date
  readTime?: number
  category?: string
  author: {
    name: string
    imageUrl?: string
  }
  _count: {
    likes: number
    comments: number
  }
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="group bg-gray-900/30 border-gray-700 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300 hover:border-[#b5b5f6]/30 hover:shadow-lg hover:shadow-[#b5b5f6]/10">
      <Link href={`/articles/${article.id}`} className="block">
        {/* Article Image */}
        
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={"/android-dark.jpg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            {article.category && (
              <Badge
                variant="outline"
                className="absolute top-3 left-3 bg-black/70 border-[#b5b5f6]/30 text-[#b5b5f6] backdrop-blur-sm"
              >
                {article.category}
              </Badge>
            )}
          </div>
        

        <CardHeader className="pb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-[#b5b5f6] transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && <p className="text-gray-400 text-sm line-clamp-3 mt-2">{article.excerpt}</p>}
        </CardHeader>

        <CardContent className="pt-0">
          {/* Author and Meta Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-gray-700">
                <AvatarImage src={article.author.imageUrl} alt={article.author.name} />
                <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">
                  {article.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-300">{article.author.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</span>
                  {article.readTime && (
                    <>
                      <span>•</span>
                      <span>{article.readTime} min read</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-400">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{article._count.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{article._count.comments}</span>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4 text-[#f7bff4]" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
