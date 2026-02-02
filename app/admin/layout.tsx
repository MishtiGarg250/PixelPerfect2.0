import type React from "react";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, BarChart3, ArrowLeft, Shield } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    // Server-side redirect for non-admins
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Gradient Header Accent */}
      <div className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] h-1"></div>

      {/* Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center gap-8">
              {/* Admin Badge */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30">
                  <Shield className="h-5 w-5 text-[#b5b5f6]" />
                </div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex gap-2">
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-[#b5b5f6]/10 transition-all duration-200"
                >
                  <Link href="/admin">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Overview
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-[#f7bff4]/10 transition-all duration-200"
                >
                  <Link href="/admin/articles">
                    <FileText className="w-4 h-4 mr-2" />
                    Articles
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-[#b5b5f6]/10 transition-all duration-200"
                >
                  <Link href="/admin/tracks">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tracks
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-4">
              {/* User Info */}
              {user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    Admin: {user.name}
                  </span>
                </div>
              )}

              {/* Back to Dashboard */}
              <Button
                variant="outline"
                asChild
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-[#b5b5f6]/50 transition-all duration-200"
              >
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-300 hover:text-white hover:bg-[#b5b5f6]/10 transition-all duration-200"
              >
                <Link href="/admin">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Overview
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-300 hover:text-white hover:bg-[#f7bff4]/10 transition-all duration-200"
              >
                <Link href="/admin/articles">
                  <FileText className="w-4 h-4 mr-1" />
                  Articles
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-300 hover:text-white hover:bg-[#b5b5f6]/10 transition-all duration-200"
              >
                <Link href="/admin/tracks">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Tracks
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Admin Panel - Manage your learning platform
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Version 1.0</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
