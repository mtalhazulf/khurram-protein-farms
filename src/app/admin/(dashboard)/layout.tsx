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
    <div className="min-h-screen bg-kp-white">
      <Sidebar email={admin.email} />
      <main className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-6 md:p-8 lg:p-10 overflow-x-auto">{children}</div>
      </main>
    </div>
  );
}
