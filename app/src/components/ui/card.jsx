import React from "react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-white/10 bg-[#161411]/85 shadow-[0_22px_80px_rgba(0,0,0,.28)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}

export { Card };
