import { UserProfile } from "@clerk/nextjs";
import { User, Settings, Sparkles } from "lucide-react";

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

      <div className="relative z-10 flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Manage Your Profile
              </h1>
              <p className="text-gray-400 mt-1">
                Update your personal information and preferences
              </p>
            </div>
          </div>

          {/* Info Bar */}
          <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-[#b5b5f6]/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#b5b5f6]" />
              <span className="text-gray-400">Secure profile management</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#f7bff4]" />
              <span className="text-gray-400">
                Keep your information up to date
              </span>
            </div>
          </div>
        </div>

        {/* Profile Container */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-3xl border border-[#b5b5f6]/20 backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
          <UserProfile
            appearance={{
              elements: {
                // Main container
                card: "w-full bg-transparent text-white border-none shadow-none p-0",

                // Root container
                rootBox: "w-full",

                // Header styling
                headerTitle:
                  "text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent",
                headerSubtitle: "text-gray-400 mt-2",

                // Navigation/Tabs
                navbar:
                  "bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-[#b5b5f6]/20 rounded-2xl p-2 mb-6 backdrop-blur-sm",
                navbarButton:
                  "text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-700/50",
                navbarButtonActive:
                  "text-white bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] px-4 py-2 rounded-xl shadow-lg",

                // Form sections
                page: "bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-2xl border border-gray-700/50 p-6 backdrop-blur-sm",

                // Form fields
                formFieldLabel: "text-white font-medium mb-2 text-sm",
                formFieldInput:
                  "bg-gray-800/50 text-white border border-gray-600/50 rounded-xl px-4 py-3 focus:border-[#b5b5f6] focus:ring-2 focus:ring-[#b5b5f6]/20 transition-all duration-300 backdrop-blur-sm",
                formFieldInputShowPasswordButton:
                  "text-[#b5b5f6] hover:text-[#f7bff4]",

                // Buttons
                button:
                  "bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/50 hover:to-gray-500/50 text-white border border-gray-600/50 hover:border-gray-500/50 rounded-xl px-6 py-3 transition-all duration-300 backdrop-blur-sm",
                buttonPrimary:
                  "bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black font-medium rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg",

                // File upload
                fileDropAreaBox:
                  "border-2 border-dashed border-[#b5b5f6]/30 hover:border-[#b5b5f6]/50 bg-gray-800/30 rounded-2xl p-8 transition-all duration-300",
                fileDropAreaButtonPrimary:
                  "bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black rounded-xl",

                // Avatar
                avatarBox:
                  "ring-4 ring-[#b5b5f6]/20 hover:ring-[#b5b5f6]/40 transition-all duration-300",

                // Links
                link: "text-[#b5b5f6] hover:text-[#f7bff4] transition-colors duration-300",

                // Alerts and messages
                alert:
                  "bg-gradient-to-r from-[#b5b5f6]/10 to-[#f7bff4]/10 border border-[#b5b5f6]/30 text-white rounded-xl backdrop-blur-sm",
                alertText: "text-white",

                // Form sections
                formHeaderTitle: "text-xl font-semibold text-white mb-2",
                formHeaderSubtitle: "text-gray-400 mb-4",

                // Dividers
                dividerLine: "border-gray-700/50",
                dividerText: "text-gray-400",

                // Modal/Dialog
                modalContent:
                  "bg-gradient-to-br from-gray-900 to-black border border-[#b5b5f6]/20 rounded-2xl backdrop-blur-sm",
                modalCloseButton: "text-gray-400 hover:text-white",

                // Tables (for sessions, etc.)
                table: "bg-gray-800/30 rounded-xl border border-gray-700/50",
                tableHead: "bg-gray-700/30",
                tableBody: "text-gray-300",

                // Badges
                badge:
                  "bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 text-[#b5b5f6] border border-[#b5b5f6]/30 rounded-full",

                // Loading states
                spinner: "text-[#b5b5f6]",
              },
              variables: {
                colorPrimary: "#b5b5f6",
                colorBackground: "transparent",
                colorText: "#ffffff",
                colorInputBackground: "rgba(31, 41, 55, 0.5)",
                colorInputText: "#ffffff",
                borderRadius: "12px",
                fontFamily: "inherit",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
