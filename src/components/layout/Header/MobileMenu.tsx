"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { MobileMenuProps } from "@/types/components"

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle, items }) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
        onClick={() => onToggle(!isOpen)}
      >
        {isOpen ? <span>✕</span> : <span>☰</span>}
      </Button>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-t bg-emerald-50 z-40">
          <nav className="container px-4 py-4 space-y-3">
            {items.map((item) => (
              <div key={item.id}>
                <a href={item.href} className="block text-emerald-700 hover:text-emerald-900 font-medium py-2">
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-4 space-y-2">
                    {item.children.map((child) => (
                      <a
                        key={child.id}
                        href={child.href}
                        className="block text-emerald-600 hover:text-emerald-800 py-1"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
