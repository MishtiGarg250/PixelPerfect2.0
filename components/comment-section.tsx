import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/loading-spinner";
import { CommentForm } from "@/components/comment-form";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

async function CommentsList({ articleId }: { articleId: string }) {
  const comments = await db.comment.findMany({
    where: { articleId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-center gap-3 p-4 bg-[#36343a] border border-[#938f99]/50 backdrop-blur-sm rounded-xl"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.user.imageUrl || ""} />
            <AvatarFallback>
              {comment.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-[#cebdfe]">
                {comment.user.name}
              </span>
              <span className="text-xs text-[#cac4cf]">
                {"• " + new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-[#e6e1e9]">{comment.body}</p>
          </div>
        </div>
      ))}
      {comments.length === 0 && (
        <p className="text-center text-[#cac4cf] py-8">
          No Comments yet. Be the first to Comment!
        </p>
      )}
    </div>
  );
}

export async function CommentSection({ articleId }: { articleId: string }) {
  const user = await getCurrentUser();

  return (
    <Card className="bg-[#211f24] border-[#36343a] backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-medium text-lg mb-5 md:mb-0 text-[#e6e1e9]">
          Comments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && <CommentForm articleId={articleId} />}

        <Suspense fallback={<LoadingSpinner />}>
          <CommentsList articleId={articleId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
