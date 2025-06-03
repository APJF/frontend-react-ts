// components/layout/Header/Header.types.ts
export interface HeaderProps {
  className?: string
  showMobileMenu?: boolean
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  children?: NavigationItem[]
}

export interface UserActionsProps {
  user: User | null
  isVip: boolean
  onLogout: () => void
}

export interface User {
  id: string
  name: string
  email: string
}
