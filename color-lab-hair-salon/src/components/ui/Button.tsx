"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest font-body",
  {
    variants: {
      variant: {
        default: "bg-accent text-background hover:bg-accent-muted",
        primary: "bg-accent text-background hover:bg-accent-muted",
        ghost:
          "border border-accent text-accent hover:bg-accent hover:text-background",
        text: "text-accent hover:text-text-primary",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Magnetic effect logic
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
      if (!magnetic) return;
      setPosition({ x: 0, y: 0 });
    };

    return magnetic ? (
      <motion.div
        className="inline-block"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={(node) => {
            buttonRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          {...props}
        />
      </motion.div>
    ) : (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

