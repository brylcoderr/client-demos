import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn("flex items-center gap-4 text-eyebrow text-text-muted mb-6", className)}
      {...props}
    >
      <div className="h-px w-8 bg-accent" />
      <span>{children}</span>
    </div>
  );
}

