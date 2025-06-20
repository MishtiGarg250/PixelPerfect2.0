import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CommentForm } from "@/components/comment-form"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

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
  })

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3 p-4 border border-gray-800 backdrop-blur-sm rounded-lg">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.user.imageUrl || ""} />
            <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-white">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-white">{comment.body}</p>
          </div>
        </div>
      ))}
      {comments.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
      )}
    </div>
  )
}

export async function CommentSection({ articleId }: { articleId: string }) {
  const user = await getCurrentUser()

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && <CommentForm articleId={articleId} />}

        <Suspense fallback={<LoadingSpinner />}>
          <CommentsList articleId={articleId} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
