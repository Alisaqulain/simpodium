"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur">
      <h1 className="text-glow mb-1 text-lg font-semibold tracking-tight text-white">
        Admin Login
      </h1>
      <p className="mb-6 text-xs text-white/60">
        Use the admin email and password configured in your environment variables.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.18em] text-white/60">
            EMAIL
          </label>
          <input
            type="email"
            autoComplete="username"
            className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-white/30 focus:border-[var(--sp-red)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.18em] text-white/60">
            PASSWORD
          </label>
          <input
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-white/30 focus:border-[var(--sp-red)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? <p className="text-xs text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-[var(--sp-red)] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(255,43,60,0.55)] hover:bg-red-500 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

