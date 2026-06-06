import React from "react";
import { cn } from "../../lib/utils";

function Badge({ className, active = false, ...props }) {
  const Element = props.onClick ? "button" : "span";
  return (
    <Element
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-medium transition",
        active ? "border-[#d6ad57]/40 bg-[#d6ad57]/15 text-stone-50" : "border-white/10 bg-white/[.035] text-stone-300",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
