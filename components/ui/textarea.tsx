import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-[#938f99] focus-visible:border-ring border-0 focus-visible:ring-[#cebdfe] ring-1 no-scrollbar ring-[#938f99] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-16 w-full rounded-lg bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
