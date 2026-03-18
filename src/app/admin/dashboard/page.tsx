import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/admin-auth";

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
      <div className="grid gap-4 md:grid-cols-3">
        <div className="sp-glass sp-glow-hover rounded-2xl border border-white/10 p-4">
          <div className="text-[11px] font-semibold tracking-[0.22em] text-white/60">
            BOOKINGS
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">Coming soon</div>
          <p className="mt-1 text-xs text-white/60">
            This card will show live booking counts once wired to MongoDB.
          </p>
        </div>
        <div className="sp-glass sp-glow-hover rounded-2xl border border-white/10 p-4">
          <div className="text-[11px] font-semibold tracking-[0.22em] text-white/60">
            CAFE ITEMS
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">Coming soon</div>
          <p className="mt-1 text-xs text-white/60">
            Manage cafe menu items from the admin panel.
          </p>
        </div>
        <div className="sp-glass sp-glow-hover rounded-2xl border border-white/10 p-4">
          <div className="text-[11px] font-semibold tracking-[0.22em] text-white/60">
            SHOP ITEMS
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">Coming soon</div>
          <p className="mt-1 text-xs text-white/60">
            Edit shop inventory and availability here.
          </p>
        </div>
      </div>
    </div>
  );
}

