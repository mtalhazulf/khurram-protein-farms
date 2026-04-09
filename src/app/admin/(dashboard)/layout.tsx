import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-kp-white">
      <Sidebar email={admin.email} />
      <main className="flex-1 p-8 md:p-10 overflow-x-auto">{children}</main>
    </div>
  );
}
