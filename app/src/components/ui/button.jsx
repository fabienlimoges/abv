import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold uppercase tracking-[.12em] transition disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[linear-gradient(135deg,#d6ad57,#a7632f)] text-stone-950 shadow-[0_18px_44px_rgba(214,173,87,.18)]",
        outline: "border border-white/10 bg-white/[.04] text-stone-100 hover:bg-white/[.08]",
        ghost: "text-[#d6ad57] hover:text-stone-100"
      },
      size: {
        default: "min-h-11 px-4",
        icon: "h-11 w-11 px-0",
        sm: "min-h-10 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
