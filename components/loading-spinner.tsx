import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center h-16 w-16 md:h-32 md:w-32 bg-[#2b292f] rounded-xl md:rounded-3xl">
        <Loader2 className="h-8 w-8 md:h-12 md:w-12 animate-spin text-[#cebdfe]" />
      </div>
    </div>
  );
}
