
import { useState } from "react"
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { componentStyles, cn } from "@/lib/styles"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVip, setIsVip] = useState(false)

  const styles = componentStyles.header

  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo.container}>
          <div className={styles.logo.icon}>J</div>
          <span className={styles.logo.text}>JapanLearn</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navigation.desktop}>
          <Link to="/about" className={styles.navigation.link}>
            Giới thiệu
          </Link>

          {/* Khóa học Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={styles.navigation.dropdown.trigger}>Khóa học</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={styles.navigation.dropdown.content}>
                    <Link to="/courses/n5" className={styles.navigation.dropdown.item}>🎓 Khóa N5</Link>
                    <Link to="/courses/n4" className={styles.navigation.dropdown.item}>🎓 Khóa N4</Link>
                    <Link to="/courses/n3" className={styles.navigation.dropdown.item}>🎓 Khóa N3</Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <a href="#" className={styles.navigation.link}>
            Cộng đồng
          </a>

          <a href="#" className={styles.navigation.link}>
            Sách
          </a>
        </nav>

        {/* Right Side Icons */}
        <div className={styles.actions.container}>
          {/* VIP/Regular Badge */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVip(!isVip)}
            className={cn(
              styles.actions.vipButton.base,
              isVip ? styles.actions.vipButton.vip : styles.actions.vipButton.regular,
            )}
          >
            {isVip ? <>👑 VIP</> : <>👤 Thường</>}
          </Button>

          {/* My Courses */}
          <Button variant="ghost" size="icon" className={styles.actions.iconButton}>
            📚<span className="sr-only">Khóa học của tôi</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className={cn(styles.actions.iconButton, "relative")}>
            🔔<Badge className={componentStyles.badge.notification}>3</Badge>
            <span className="sr-only">Thông báo</span>
          </Button>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className={styles.actions.avatar.container}>A</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className={styles.actions.avatar.dropdown.header}>
                <div className={styles.actions.avatar.container}>A</div>
                <div className="flex flex-col space-y-1">
                  <p className={styles.actions.avatar.dropdown.item}>Nguyễn Văn A</p>
                  <p className={styles.actions.avatar.dropdown.email}>user@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                👤<span>Thông tin cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                ⚙️<span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(styles.actions.iconButton, "md:hidden")}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <span>✕</span> : <span>☰</span>}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.navigation.mobile}>
          <nav className="container px-4 py-4 space-y-3">
            <a href="#" className="block text-emerald-700 hover:text-emerald-900 font-medium py-2">
              Giới thiệu
            </a>

            <div className="space-y-2">
              <p className="text-emerald-800 font-medium">Khóa học</p>
              <div className="pl-4 space-y-2">
                <a href="#" className="block text-emerald-600 hover:text-emerald-800 py-1">
                  Khóa N5
                </a>
                <a href="#" className="block text-emerald-600 hover:text-emerald-800 py-1">
                  Khóa N4
                </a>
                <a href="#" className="block text-emerald-600 hover:text-emerald-800 py-1">
                  Khóa N3
                </a>
              </div>
            </div>

            <a href="#" className="block text-emerald-700 hover:text-emerald-900 font-medium py-2">
              Cộng đồng
            </a>

            <a href="#" className="block text-emerald-700 hover:text-emerald-900 font-medium py-2">
              Sách
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
