import type { ReactNode } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { verifyAdminToken } from "@/lib/admin-auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("sp_admin")?.value;
  const payload = verifyAdminToken(token);
  const isAuthed = !!payload;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050712] to-black text-white">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="sp-container flex items-center justify-between py-4">
          <Link href="/" className="text-xs font-semibold tracking-[0.24em] text-white/70">
            SIM PODIUM ADMIN
          </Link>
          {isAuthed ? (
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="hidden sm:inline">{payload?.email}</span>
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/80 hover:bg-white/10"
                >
                  LOG OUT
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </header>
      <main className="sp-container py-8">{children}</main>
    </div>
  );
}

