import React from "react";
import { cn } from "../../lib/utils";

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "min-h-12 rounded-md border border-white/10 bg-white/[.04] px-3 text-sm normal-case tracking-normal text-stone-50 outline-none focus:border-[#d6ad57]/60",
        className
      )}
      {...props}
    />
  );
}

export { Input };
