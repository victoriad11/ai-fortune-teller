import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitcherContextValue {
  value: unknown
  onValueChange: (value: unknown) => void
}

const SwitcherContext = React.createContext<SwitcherContextValue | null>(null)

function useSwitcher() {
  const context = React.useContext(SwitcherContext)
  if (!context) {
    throw new Error("Switcher components must be used within SwitcherRoot")
  }
  return context
}

interface SwitcherRootProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  value: T
  onValueChange: (value: T) => void
}

function SwitcherRoot<T>({ value, onValueChange, className, children, ...props }: SwitcherRootProps<T>) {
  const contextValue = React.useMemo(
    () => ({
      value,
      onValueChange: onValueChange as (value: unknown) => void,
    }),
    [value, onValueChange]
  )

  return (
    <SwitcherContext.Provider value={contextValue}>
      <div
        className={cn("grid grid-cols-2 gap-3 p-1 bg-background rounded-xl", className)}
        {...props}
      >
        {children}
      </div>
    </SwitcherContext.Provider>
  )
}

interface SwitcherItemProps<T> extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "value"> {
  value: T
  icon?: React.ReactNode
}

function SwitcherItem<T>({ value, icon, className, children, ...props }: SwitcherItemProps<T>) {
  const { value: selectedValue, onValueChange } = useSwitcher()
  const isActive = value === selectedValue

  return (
    <button
      type="button"
      className={cn(
        "px-4 py-3 font-semibold rounded-lg transition-all duration-250 flex items-center justify-center gap-2",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-2 border-primary/40 scale-105"
          : "text-muted-foreground hover:bg-accent hover:text-foreground border-2 border-transparent hover:border-border",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </button>
  )
}

export { SwitcherRoot, SwitcherItem }
