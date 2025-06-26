"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateProgress } from "@/app/actions/progress";
import { Loader2 } from "lucide-react";

interface ProgressToggleProps {
  itemId: string;
  currentStatus: string;
  userId: string;
}

export function ProgressToggle({
  itemId,
  currentStatus,
  userId,
}: ProgressToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useState(currentStatus);

  const handleStatusChange = () => {
    const nextStatus =
      optimisticStatus === "NOT_STARTED"
        ? "IN_PROGRESS"
        : optimisticStatus === "IN_PROGRESS"
          ? "COMPLETED"
          : "NOT_STARTED";

    setOptimisticStatus(nextStatus);

    startTransition(async () => {
      await updateProgress(itemId, nextStatus as any);
    });
  };

  const getButtonText = () => {
    switch (optimisticStatus) {
      case "NOT_STARTED":
        return "Start";
      case "IN_PROGRESS":
        return "Finish";
      case "COMPLETED":
        return "Reset";
      default:
        return "Start";
    }
  };

  return (
    <Button
      onClick={handleStatusChange}
      disabled={isPending}
      size="sm"
      className="button-primary bg-[#cebdfe] text-[#35275d] rounded-full py-5 px-6 border-0"
      variant={optimisticStatus === "COMPLETED" ? "default" : "outline"}
    >
      {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      {getButtonText()}
    </Button>
  );
}
