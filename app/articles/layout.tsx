import type React from "react";
import UserSidebar from "@/components/dashboard-sidebar";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}