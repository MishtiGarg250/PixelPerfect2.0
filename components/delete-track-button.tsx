"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTrack } from "@/app/actions/tracks";
import { Trash2, Loader2, AlertCircle } from "lucide-react";

interface DeleteTrackButtonProps {
  trackId: string;
  trackTitle: string;
}

export function DeleteTrackButton({
  trackId,
  trackTitle,
}: DeleteTrackButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTrack(trackId);
        setOpen(false);
      } catch (error) {
        console.error("Error deleting track:", error);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-[#36343a] text-[#efb8c9] hover:bg-[#efb8c9]/10 hover:text-[#efb8c9] hover:border-[#efb8c9]/50 rounded-xl"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#211f24] border-[#36343a] rounded-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#efb8c9]/10">
              <AlertCircle className="h-5 w-5 text-[#efb8c9]" />
            </div>
            <AlertDialogTitle className="text-[#e6e1e9]">
              Delete Learning Track
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-[#cac4cf]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#e6e1e9]">"{trackTitle}"</span>
            ?
            <br />
            <br />
            This action cannot be undone. This will permanently delete the
            track, all its modules, learning items, and user progress data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            className="bg-transparent border-[#36343a] text-[#cac4cf] hover:bg-[#2b292f] hover:text-[#e6e1e9] rounded-xl"
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-[#efb8c9] text-[#141318] hover:bg-[#efb8c9]/90 rounded-xl"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Track"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}