"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toggleLike } from "@/app/actions/likes";
import { useAuth } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

interface LikeButtonProps {
  articleId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({
  articleId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const { isSignedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (!isSignedIn) return;

    const newLikedState = !isLiked;
    const newCount = newLikedState ? likeCount + 1 : likeCount - 1;

    setIsLiked(newLikedState);
    setLikeCount(newCount);

    startTransition(async () => {
      await toggleLike(articleId);
    });
  };

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button variant="outline" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          {initialCount} Likes
        </Button>
      </SignInButton>
    );
  }

  return (
    <Button
      className="button-primary rounded-full py-5"
      variant={isLiked ? "default" : "outline"}
      size="lg"
      onClick={handleLike}
      disabled={isPending}
    >
      <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
      {likeCount} {likeCount === 1 ? "Like" : "Likes"}
    </Button>
  );
}
