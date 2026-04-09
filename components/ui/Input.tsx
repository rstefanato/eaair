import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-text"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[10px] border-[1.5px] border-border bg-off-white px-3 py-3.5 font-body text-sm text-text placeholder:text-text-light transition-colors duration-200 focus:border-blue focus:bg-white focus:outline-none",
            error && "border-red",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
