import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/admin-auth";
import { AdminDashboardClient } from "./AdminDashboardClient";

export default function AdminDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("sp_admin")?.value;
  const payload = verifyAdminToken(token);

  if (!payload) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-glow text-2xl font-semibold tracking-tight text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Signed in as <span className="font-mono text-white/90">{payload.email}</span>.
        </p>
      </div>
      <AdminDashboardClient />
    </div>
  );
}

