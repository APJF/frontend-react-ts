"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

const useDialog = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog")
  }
  return context
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open = false, onOpenChange, children }: DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(newOpen)
      } else {
        setInternalOpen(newOpen)
      }
    },
    [isControlled, onOpenChange],
  )

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleOpenChange(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, handleOpenChange])

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>{children}</DialogContext.Provider>
  )
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog()

    return (
      <button
        ref={ref}
        className={className}
        onClick={(e) => {
          onClick?.(e)
          onOpenChange(true)
        }}
        {...props}
      />
    )
  },
)
DialogTrigger.displayName = "DialogTrigger"

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useDialog()
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => contentRef.current!)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />

      {/* Content */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div
          ref={contentRef}
          className={cn(
            "relative bg-white rounded-lg shadow-lg border max-w-lg w-full mx-4 p-6",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </div>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props} />
  ),
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)}
      {...props}
    />
  ),
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DialogDescription.displayName = "DialogDescription"

const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog()

    return (
      <button
        ref={ref}
        className={className}
        onClick={(e) => {
          onClick?.(e)
          onOpenChange(false)
        }}
        {...props}
      />
    )
  },
)
DialogClose.displayName = "DialogClose"

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
