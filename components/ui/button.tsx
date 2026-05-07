import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center gap-3 font-mono uppercase no-underline cursor-pointer border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-bg border-gold hover:bg-gold-deep hover:border-gold-deep hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-ink border-rule-strong hover:border-gold hover:text-gold",
        outline:
          "bg-transparent text-ink border-rule-strong hover:border-gold hover:text-gold disabled:hover:border-rule-strong disabled:hover:text-ink bg-bg/0",
        icon:
          "border-rule-strong text-ink hover:border-gold hover:text-gold bg-bg/60",
      },
      size: {
        default: "px-8 py-[18px] text-[12px] tracking-[0.22em] gap-3",
        sm: "px-5 py-3 text-[11px] tracking-[0.22em] gap-2.5",
        icon: "w-12 h-12 p-0 justify-center",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
