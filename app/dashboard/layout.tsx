import type React from "react";
import UserSidebar from "@/components/dashboard-sidebar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
