import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function DeployStatusPage() {
  const checkedAt = new Date().toISOString();

  let dbOk = false;
  let collections: string[] = [];
  let dbError: string | null = null;

  try {
    const db = await connectToDatabase();
    const cols = await db.listCollections().toArray();
    collections = cols.map((c: { name: string }) => c.name);
    dbOk = true;
  } catch (e) {
    dbOk = false;
    dbError = e instanceof Error ? e.message : "Unknown error";
  }

  const env = process.env.NODE_ENV ?? "unknown";

  return (
    <div className="sp-container pb-20 pt-10">
      <div className="sp-glass sp-neon-border p-6 sm:p-8">
        <div className="text-glow text-xl font-semibold">
          Deployment Status
        </div>
        <div className="mt-3 text-sm text-white/70">
          Checked at: <span className="text-white/90">{checkedAt}</span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
              APP
            </div>
            <div className="mt-2 text-lg font-semibold text-white/90">
              {env === "production" ? "Deployment done ✅" : "Deployment in dev ✅"}
            </div>
            <div className="mt-1 text-[11px] text-white/60">
              NODE_ENV: {env}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
              MONGODB
            </div>
            <div className="mt-2 text-lg font-semibold text-white/90">
              {dbOk ? "DB connected ✅" : "DB not connected ❌"}
            </div>
            {dbOk ? (
              <div className="mt-2 text-[11px] text-white/60">
                Collections: {collections.slice(0, 8).join(", ")}
                {collections.length > 8 ? "..." : ""}
              </div>
            ) : (
              <div className="mt-2 text-[11px] text-red-300">{dbError}</div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
            NOTES
          </div>
          <div className="mt-2 text-sm text-white/70 leading-7">
            This page is meant for deployment verification only. If the APP section is shown, the
            site is live. If MongoDB is not connected, admin/public APIs may fail.
          </div>
        </div>
      </div>
    </div>
  );
}

