import type React from "react";
import AdminSidebar from "@/components/admin-sidebar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Uncomment this to enforce admin-only access
  // if (user.role !== "admin") {
  //   redirect("/dashboard");
  // }

  return (
    <div className="flex h-screen bg-[#151218]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}