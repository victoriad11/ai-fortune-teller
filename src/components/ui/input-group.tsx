import * as React from "react"
import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex items-center bg-secondary border border-border rounded-2xl p-2",
      "transition-all duration-250",
      "focus-within:border-muted-foreground/40 focus-within:shadow-[0_0_10px_rgba(0,0,0,0.1)]",
      className
    )}
    {...props}
  />
))
InputGroup.displayName = "InputGroup"

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex-1 px-4 py-3 text-base bg-transparent border-0",
      "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
InputGroupInput.displayName = "InputGroupInput"

const InputGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "p-2 px-4 text-muted-foreground text-lg rounded",
      "opacity-60 hover:opacity-100 hover:bg-accent",
      "transition-all",
      className
    )}
    {...props}
  />
))
InputGroupAction.displayName = "InputGroupAction"

export { InputGroup, InputGroupInput, InputGroupAction }
