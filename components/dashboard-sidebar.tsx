"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  User,
  Menu,
  Heart,
  BarChartIcon as ChartColumn,
  LayoutDashboard,
  MessageCircle,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Sparkle,
  Trophy,
  Clock,
  Goal,
  X,
  // Sparkles,
  // Trophy,
  // Clock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="sm:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-[#b5b5f6]/10 to-[#f7bff4]/10 border-[#b5b5f6]/30 text-[#d2bcfd] hover:text-white hover:bg-gradient-to-r hover:from-[#b5b5f6]/20 hover:to-[#f7bff4]/20 hover:border-[#b5b5f6]/50 transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg backdrop-blur-sm"
          >
            <Menu className="h-5 w-5" />
            <span className="ml-2 font-medium">Menu </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="sm:w-[280px] p-0 bg-gradient-to-b from-[#0f0d13] via-[#201f24] to-[#0f0d13] border-r border-[#48454e] shadow-2xl backdrop-blur-sm"
        >
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block h-screen sm:w-[280px] bg-gradient-to-b from-[#0f0d13] via-[#201f24] to-[#0f0d13] border-r border-[#48454e] shadow-2xl backdrop-blur-sm">
        <DashboardSidebar />
      </div>
    </div>
  );
};

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname();

  const links = [
    // {
    //   href: "/",
    //   icon: Home,
    //   label: "Home",
    //   description: "Back to Landing Page",
    //   color: "from-[#b5b5f6] to-[#f7bff4]",
    // },
    {
      href: "/dashboard/",
      icon: LayoutDashboard,
      label: "Dashboard",
      description: "Go to Dashboard",
      color: "from-[#b5b5f6] to-[#f7bff4]",
    },
    {
      href: "/dashboard/tracks",
      icon: Goal,
      label: "Roadmaps",
      description: "View your progress",
      color: "from-[#b5b5f6] to-[#f7bff4]",
    },
    {
      href: "/articles/",
      icon: BookOpen,
      label: "All Articles",
      description: "Articles to Explore",
      color: "from-[#b5b5f6] to-[#f7bff4]",
    },
    {
      href: "/dashboard/likedArticles",
      icon: Heart,
      label: "Liked Articles",
      description: "Your Favorites",
      color: "from-[#b5b5f6] to-[#f7bff4]",
    },
    {
      href: "/dashboard/comments",
      icon: MessageCircle,
      label: "Comments",
      description: "Your Discussions",
      color: "from-[#b5b5f6] to-[#f7bff4]",
    },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <X
        className="md:hidden absolute top-6 right-6 z-50 text-[#cac4cf] cursor-pointer hover:text-[#e6e1e9] transition-colors duration-300"
        onClick={closeSheet}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

      <div className="relative z-10 flex flex-col h-full px-6 py-6">
        {/* Logo / Title */}
        <div className="flex items-center gap-3 mb-8 px-2 group">
          <Link
            href="/"
            className="flex items-center gap-3 group-hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="text-[#e6e1e9]" width={28} height={28} />
            <div>
              <span className="text-xl font-bold bg-gradient-to-r ml-2 from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text group-hover:from-[#c5c5f8] group-hover:to-[#f8cff6] transition-all duration-300">
                Pixel Perfect
              </span>
              <div className="text-xs text-[#e6e1e9] ml-2 group-hover:text-[#e6e1e9] transition-colors duration-300">
                Back to Landing Page
              </div>
            </div>
          </Link>
        </div>

        {/* User Stats */}
        {/* <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-[#b5b5f6]/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-300">Your Progress</span>
            <Sparkle className="w-4 h-4 text-[#f7bff4]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-lg font-bold text-white">12</span>
              </div>
              <span className="text-xs text-gray-400">Completed</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-blue-400 mr-1" />
                <span className="text-lg font-bold text-white">5</span>
              </div>
              <span className="text-xs text-gray-400">In Progress</span>
            </div>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {links.map(
            ({ href, icon: Icon, label, description, color }, index) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");

              return (
                <Link href={href} key={href}>
                  <div
                    className={`group relative flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive
                        ? `bg-gradient-to-r ${color} text-[#141318] shadow-lg shadow-purple-500/25`
                        : "text-[#cac4cf] hover:text-[#e6e1e9] hover:bg-[#211f24]"
                    }`}
                    onClick={closeSheet}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Icon Container */}
                    <div
                      className={`relative p-2 rounded-lg md:rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/20 shadow-lg"
                          : "bg-[#36343a] group-hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 transition-all duration-300 ${
                          isActive
                            ? "text-[#141318]"
                            : "text-[#cac4cf] group-hover:text-white"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-[#141318]"
                            : "text-[#cac4cf] group-hover:text-white"
                        }`}
                      >
                        {label}
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          isActive
                            ? "text-[#36343a]"
                            : "text-[#938f99] group-hover:text-gray-400"
                        }`}
                      >
                        {description}
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <ChevronRight
                      className={`h-4 w-4 transition-all duration-300 ${
                        isActive
                          ? "text-[#141318] transform translate-x-1"
                          : "text-[#938f99] group-hover:text-gray-300 group-hover:transform group-hover:translate-x-1"
                      }`}
                    />

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4c3e76] rounded-r-full animate-pulse"></div>
                    )}

                    {/* Hover Effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                  </div>
                </Link>
              );
            },
          )}
        </nav>

        {/* Footer */}
        {/* <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="p-4 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">P</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Premium User</div>
                <div className="text-xs text-gray-400">Level 5 Student</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center">© 2024 Pixel Perfect</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default UserSidebar;
