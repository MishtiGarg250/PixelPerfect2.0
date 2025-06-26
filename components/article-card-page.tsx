import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  featuredImage: string | null;
  createdAt: Date;
  readTime?: number;
  category?: string;
  author: {
    name: string;
    imageUrl: string | null;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCardPage({ article }: ArticleCardProps) {
  return (
    <Card className="group bg-[#201f24] border-[#2b292f] rounded-3xl backdrop-blur-sm group-hover:bg-[#1c1b20] transition-all duration-300 hover:border-[#36343a] hover:shadow-lg hover:shadow-[#36343a]/50">
      <Link href={`/articles/${article.id}`} className="block">
        {/* Article Image */}
        <div className="relative rounded-t-3xl aspect-video overflow-hidden mt-[-24px]">
          <Image
            src="/android-dark.jpg"
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201f24] hover:from-[#1c1b20] via-transparent to-transparent" />

          {/* Category Badge */}
          {article.category && (
            <Badge
              variant="outline"
              className="absolute top-3 left-3 sm:top-5 sm:left-5 px-2 py-1 sm:px-4 sm:py-2 bg-[#623b4b] border-[#eeb8cb]/20 text-[#ffd9e5] rounded-full text-xs sm:text-sm"
            >
              {article.category}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-3 px-4 sm:px-6">
          <h3 className="text-lg sm:text-xl text-[#e6e1e9] group-hover:text-[#e6deff] font-medium transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-[#c9c4d0] text-sm line-clamp-3 mt-2 sm:mt-3">
              {article.excerpt}
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-0 px-4 sm:px-6">
          {/* Author and Meta Info */}
          <div className="flex items-start sm:items-center gap-3 mb-4">
            <Avatar className="h-8 w-8 border border-gray-700 flex-shrink-0">
              {article.author.imageUrl && (
                <AvatarImage
                  src={article.author.imageUrl}
                  alt={article.author.name}
                />
              )}
              <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">
                {article.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#e6e1e9] truncate">
                {article.author.name}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#c9c4d0] mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                {article.readTime && (
                  <div className="flex items-center gap-1">
                    <span>•</span>
                    <span>{article.readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-[#49454e]">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1 text-[#cbc4cf]">
                <Heart className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{article._count.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-[#cbc4cf]">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{article._count.comments}</span>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4 text-[#cebdfe] flex-shrink-0" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
