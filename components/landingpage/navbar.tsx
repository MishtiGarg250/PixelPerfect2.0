"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { UserButton, SignedIn } from "@clerk/nextjs"
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("about")

  const navItems = [
    { name: "About us", href: "/", id: "about" },
  
    { name: "Dashboard", href: "/dashboard", id: "dashboard" },
    { name: "Articles", href: "/articles", id: "articles" },
  
  ]

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800 shadow-2xl backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#b5b5f6] via-purple-500 to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
                  <Image src="/logo.png" alt="PixelPerfect Logo" width={24} height={24} className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-extrabold tracking-tight group-hover:scale-105 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text group-hover:from-[#c5c5f8] group-hover:to-[#f8cff6] transition-all duration-300">
                    Pixel
                  </span>
                  <span className="text-white group-hover:text-gray-100 transition-colors duration-300"> Perfect</span>
                </span>
                
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
                    activeItem === item.id
                      ? "text-white bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] shadow-lg shadow-purple-500/25"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeItem === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full animate-pulse opacity-75"></div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b5b5f6]/0 to-[#f7bff4]/0 hover:from-[#b5b5f6]/10 hover:to-[#f7bff4]/10 transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Auth */}
            <SignedIn>
              <div className="relative">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-full ring-2 ring-[#b5b5f6]/50 hover:ring-[#f7bff4]/50 transition-all duration-300 transform hover:scale-105",
                    },
                  }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="hidden md:flex gap-2">
                <SignInButton>
                  <Button
                    variant="outline"
                    className="border-2 border-[#b5b5f6] text-[#b5b5f6] hover:bg-[#b5b5f6] hover:text-black transition-all duration-300 transform hover:scale-105 rounded-full px-6"
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 rounded-full px-6">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:lg:hidden text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-full p-2 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-6 space-y-4 animate-in slide-in-from-top duration-300">
            {/* Mobile Navigation */}
            <div className="space-y-2 px-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`block py-3 px-4 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    activeItem === item.id
                      ? "text-white bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {activeItem === item.id && (
                      <div className="w-2 h-2 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full animate-pulse"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <div className="px-4 flex flex-col gap-3 pt-4 border-t border-gray-800">
                <SignInButton>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#b5b5f6] text-[#b5b5f6] hover:bg-[#b5b5f6] hover:text-black transition-all duration-300 rounded-full py-3"
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 shadow-lg rounded-full py-3">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile User Info for Signed In Users */}
            <SignedIn>
              <div className="px-4 pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full",
                      },
                    }}
                  />
                  <div>
                    <div className="text-white font-medium">Welcome back!</div>
                    <div className="text-gray-400 text-sm">Signed in successfully</div>
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>
        )}
      </div>
    </div>
  )
}
