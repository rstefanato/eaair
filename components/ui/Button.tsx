import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "ghost" | "secondary" | "blue";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-white shadow-[0_4px_14px_var(--color-orange-glow)] hover:shadow-[0_6px_24px_rgba(249,115,22,0.3)] active:scale-[0.98]",
  ghost:
    "bg-white/[0.04] text-white/80 border border-white/[0.08] backdrop-blur-sm hover:bg-white/10 hover:border-white/20",
  secondary:
    "bg-blue-light text-blue hover:bg-blue/10 active:scale-[0.98]",
  blue:
    "bg-blue text-white shadow-[0_4px_14px_var(--color-blue-glow)] hover:shadow-[0_6px_24px_rgba(24,99,220,0.25)] active:scale-[0.98]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative flex w-full items-center justify-center gap-2 rounded-[13px] px-5 py-4 font-heading text-[14.5px] font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
