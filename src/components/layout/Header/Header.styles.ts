// components/layout/Header/Header.styles.ts
import { cn } from "@/lib/utils"

export const headerStyles = {
  container: (className?: string) =>
    cn(
      "sticky top-0 z-50 w-full border-b",
      "bg-emerald-50/95 backdrop-blur",
      "supports-[backdrop-filter]:bg-emerald-50/60",
      className,
    ),
  inner: "container flex h-16 items-center justify-between px-4",
  logo: {
    container: "flex items-center space-x-2",
    icon: "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold",
    text: "text-xl font-bold text-emerald-800",
  },
  navigation: {
    desktop: "hidden md:flex items-center space-x-6",
    mobile: "md:hidden border-t bg-emerald-50",
    link: "text-emerald-700 hover:text-emerald-900 font-medium transition-colors",
  },
}
