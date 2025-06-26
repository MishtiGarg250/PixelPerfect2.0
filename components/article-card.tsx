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

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="bg-[#201f24] md:w-sm w-xs border-[#36343a] rounded-3xl backdrop-blur-sm hover:bg-[#1c1b20] transition-all duration-300 hover:border-[#36343a] hover:shadow-lg hover:shadow-[#36343a]/50">
      <Link href={`/articles/${article.id}`} className="block">
        {/* Article Image */}

        <div className="relative rounded-3xl aspect-video overflow-hidden mt-[-16px] md:mt-[-24px] ">
          <Image
            src={"/android-dark.jpg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t hover:from-[#1c1b20] from-[#201f24] via-transparent to-transparent" />

          {/* Category Badge */}
          {article.category && (
            <Badge
              variant="outline"
              className="absolute px-4 py-2 top-5 left-5 bg-[#623b4b] border-[#eeb8cb]/20 text-[#ffd9e5] rounded-full"
            >
              {article.category}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl text-[#e6e1e9] group-hover:text-[#e6deff] font-medium transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-[#c9c4d0] text-sm line-clamp-3 mt-3">
              {article.excerpt}
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {/* Author and Meta Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-gray-700">
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
              <div>
                <p className="text-sm font-medium text-[#e6e1e9]">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#c9c4d0]">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
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
          <div className="flex items-center justify-between pt-3 border-t border-[#49454e]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#cbc4cf]">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{article._count.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-[#cbc4cf]">
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
  );
}
