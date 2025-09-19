"use client"

import type React from "react"
import { useState } from "react"
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  CreditCard,
  Edit,
  MessageCircle,
  DollarSign,
  User,
  LogOut,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "./theme-context"

interface MobileLayoutProps {
  children: React.ReactNode
  title: string
}

export default function MobileLayout({ children, title }: MobileLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const menuItems = [
    { href: "/dashboard", label: "Дашборд", icon: Home },
    { href: "/orders", label: "Заказы", icon: ShoppingCart },
    { href: "/requisites", label: "Реквизиты", icon: CreditCard },
    { href: "/claims", label: "Претензии", icon: Edit },
    { href: "/sms", label: "Смс Сообщения", icon: MessageCircle },
    { href: "/payouts", label: "Выплаты", icon: DollarSign },
  ]

  const accountItems = [{ href: "/profile", label: "Профиль", icon: User }]

  const isMenuItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn")
    sessionStorage.removeItem("username")
    window.location.href = "/login"
  }

  const getCurrentPageTitle = () => {
    if (pathname === "/profile") return "Профиль"
    if (pathname === "/dashboard") return "Дашборд"
    if (pathname.startsWith("/orders")) return "Заказы"
    if (pathname.startsWith("/requisites")) return "Реквизиты"
    if (pathname.startsWith("/claims")) return "Претензии"
    if (pathname.startsWith("/sms")) return "Смс Сообщения"
    if (pathname.startsWith("/payouts")) return "Выплаты"
    return title
  }

  return (
    <div className="min-h-screen bg-[rgb(17,24,39)] text-[rgb(243,244,246)] relative overflow-x-clip">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-80 bg-[rgb(31,41,55)] border-r border-[rgb(55,65,81)] flex-col z-0">
        {/* Sidebar Header */}
        <header className="flex items-center justify-center h-16 border-b border-[rgb(55,65,81)] px-6">
          <Link href="/" className="text-white font-bold text-xl tracking-tight">
            Wat
          </Link>
        </header>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-6">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = isMenuItemActive(item.href)
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                      isActive
                        ? "bg-[rgb(245,158,11)] text-white"
                        : "text-[rgb(209,213,219)] hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <IconComponent size={20} className="flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Separator */}
          <div className="my-6 border-t border-[rgb(55,65,81)] -mx-6"></div>

          {/* Account Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[rgb(209,213,219)]">АККАУНТ</span>
              <ChevronUp size={12} className="text-[rgb(209,213,219)] transform rotate-180" />
            </div>
            <ul className="space-y-1">
              {accountItems.map((item) => {
                const IconComponent = item.icon
                const isActive = isMenuItemActive(item.href)
                return (
                  <li key={item.href} className="overflow-hidden">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                        isActive
                          ? "bg-[rgb(245,158,11)] text-white"
                          : "text-[rgb(209,213,219)] hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <IconComponent size={20} className="flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-80 flex flex-col min-h-screen">
        <header className="sticky top-0 bg-[rgb(31,41,55)] border-b border-[rgb(55,65,81)] h-16 flex items-center px-8 z-10">
          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsMenuOpen(!isMenuOpen)
            }}
            className="lg:hidden text-[rgb(245,158,11)] hover:text-[rgb(245,158,11)]/80 transition-colors mr-4"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex justify-between items-center flex-1">
            <div className="flex-1 hidden lg:block">
              <ul className="flex text-white font-medium text-sm gap-4 items-center">
                <li>
                  <span className="text-[rgb(209,213,219)]">{getCurrentPageTitle()}</span>
                </li>
              </ul>
            </div>

            {/* Profile Menu */}
            <div className="relative ml-auto">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-[rgb(17,24,39)] flex items-center justify-center hover:bg-[rgb(31,41,55)] transition-colors"
                style={{
                  backgroundImage: "url('https://ui-avatars.com/api/?name=m&color=FFFFFF&background=111827')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute right-0 top-12 w-56 bg-[rgb(31,41,55)] rounded-lg shadow-xl z-50 border border-[rgb(55,65,81)]">
                    <div className="p-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-2 py-2 text-sm text-[rgb(243,244,246)] hover:bg-gray-700 rounded-md"
                      >
                        <User size={20} className="text-[rgb(107,114,128)]" />
                        <span className="flex-1 truncate">maccarty29</span>
                      </Link>
                    </div>
                    <div className="border-t border-[rgb(55,65,81)] p-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-2 py-2 text-sm text-[rgb(243,244,246)] hover:bg-gray-700 rounded-md"
                      >
                        <LogOut size={20} className="text-[rgb(107,114,128)]" />
                        <span className="flex-1 text-left">Выйти</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed left-0 top-0 bottom-0 z-40 w-[70%] bg-[rgb(31,41,55)] border-r border-[rgb(55,65,81)] lg:hidden">
              <div className="px-4 py-4">
                <div className="text-xl font-bold mb-8 text-white">Wat</div>

                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon
                    const isActive = isMenuItemActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 mx-1 rounded-lg transition-colors ${
                          isActive
                            ? "bg-[rgb(245,158,11)] text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <IconComponent size={16} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>

                {/* Separator line */}
                <div className="my-6 border-t border-[rgb(55,65,81)]"></div>

                <div className="mx-1">
                  <div className="flex items-center justify-between px-3 py-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">АККАУНТ</span>
                    <ChevronUp size={12} className="text-gray-400" />
                  </div>
                  <nav className="space-y-1">
                    {accountItems.map((item) => {
                      const IconComponent = item.icon
                      const isActive = isMenuItemActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 mx-1 rounded-lg transition-colors ${
                            isActive ? "bg-[rgb(245,158,11)] text-white" : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <IconComponent size={16} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
