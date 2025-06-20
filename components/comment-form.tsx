"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addComment } from "@/app/actions/comments"
import { Loader2 } from "lucide-react"

interface CommentFormProps {
  articleId: string
}

export function CommentForm({ articleId }: CommentFormProps) {
  const [comment, setComment] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) return

    startTransition(async () => {
      await addComment(articleId, comment)
      setComment("")
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <Textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isPending}
        className="text-white"
      />
      <Button className="button-primary" type="submit" disabled={isPending || !comment.trim()}>
        {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Post Comment
      </Button>
    </form>
  )
}
