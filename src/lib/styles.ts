// Theme và Style Constants cho toàn bộ ứng dụng

export const colors = {
  primary: {
    50: "emerald-50",
    100: "emerald-100",
    400: "emerald-400",
    500: "emerald-500",
    600: "emerald-600",
    700: "emerald-700",
    800: "emerald-800",
    900: "emerald-900",
  },
  secondary: {
    400: "teal-400",
    500: "teal-500",
    600: "teal-600",
  },
  accent: {
    yellow: {
      400: "yellow-400",
      500: "yellow-500",
    },
    orange: {
      500: "orange-500",
      600: "orange-600",
    },
  },
  status: {
    error: "red-500",
    warning: "yellow-500",
    success: "green-500",
  },
  neutral: {
    white: "white",
    gray: {
      100: "gray-100",
      500: "gray-500",
      600: "gray-600",
      900: "gray-900",
    },
  },
} as const

export const spacing = {
  xs: "1",
  sm: "2",
  md: "4",
  lg: "6",
  xl: "8",
  "2xl": "12",
  "3xl": "16",
} as const

export const borderRadius = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const

export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const

export const typography = {
  size: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
} as const

// Component Styles
export const componentStyles = {
  header: {
    container: `sticky top-0 z-50 w-full border-b bg-${colors.primary[50]}/95 backdrop-blur supports-[backdrop-filter]:bg-${colors.primary[50]}/60`,
    inner: `container flex h-${spacing["3xl"]} items-center justify-between px-${spacing.md}`,
    logo: {
      container: `flex items-center space-x-${spacing.sm}`,
      icon: `flex h-${spacing.xl} w-${spacing.xl} items-center justify-center ${borderRadius.lg} bg-gradient-to-br from-${colors.primary[500]} to-${colors.secondary[600]} text-${colors.neutral.white} ${typography.weight.bold}`,
      text: `${typography.size.xl} ${typography.weight.bold} text-${colors.primary[800]}`,
    },
    navigation: {
      desktop: `hidden md:flex items-center space-x-${spacing.lg}`,
      mobile: `md:hidden border-t bg-${colors.primary[50]}`,
      link: `text-${colors.primary[700]} hover:text-${colors.primary[900]} ${typography.weight.medium} transition-colors`,
      dropdown: {
        trigger: `text-${colors.primary[700]} hover:text-${colors.primary[900]} ${typography.weight.medium} bg-transparent hover:bg-${colors.primary[100]}`,
        content: `grid w-48 gap-${spacing.sm} p-${spacing.md}`,
        item: `flex items-center space-x-${spacing.sm} ${borderRadius.md} p-${spacing.sm} hover:bg-${colors.primary[50]} transition-colors`,
      },
    },
    actions: {
      container: `flex items-center space-x-3`,
      vipButton: {
        base: `transition-all duration-200`,
        vip: `bg-gradient-to-r from-${colors.accent.yellow[400]} to-${colors.accent.orange[500]} text-${colors.neutral.white} hover:from-${colors.accent.yellow[500]} hover:to-${colors.accent.orange[600]}`,
        regular: `bg-${colors.primary[100]} text-${colors.primary[700]} hover:bg-${colors.primary[200]}`,
      },
      iconButton: `text-${colors.primary[700]} hover:text-${colors.primary[900]} hover:bg-${colors.primary[100]}`,
      avatar: {
        container: `h-${spacing.xl} w-${spacing.xl} ${borderRadius.full} bg-gradient-to-br from-${colors.primary[400]} to-${colors.secondary[500]} flex items-center justify-center text-${colors.neutral.white} ${typography.weight.medium}`,
        dropdown: {
          header: `flex items-center space-x-${spacing.sm} p-${spacing.sm}`,
          item: `text-${typography.size.sm} ${typography.weight.medium}`,
          email: `${typography.size.xs} text-muted-foreground`,
        },
      },
    },
  },
  badge: {
    notification: `absolute -top-1 -right-1 h-5 w-5 ${borderRadius.full} p-0 ${typography.size.xs} bg-${colors.status.error} hover:bg-${colors.status.error}`,
  },
} as const

// Utility functions
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ")
}

export const getColorClass = (color: string, shade?: string | number): string => {
  return shade ? `${color}-${shade}` : color
}

export const createGradient = (from: string, to: string): string => {
  return `bg-gradient-to-br from-${from} to-${to}`
}
