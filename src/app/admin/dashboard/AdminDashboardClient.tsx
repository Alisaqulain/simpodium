"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  simulator: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
};

type ShopItem = {
  id: string;
  name: string;
  price: string;
  desc: string;
  img: string;
  featured: boolean;
};

type CafeItem = {
  id: string;
  name: string;
  price: string;
  desc: string;
  category: string;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string | null;
};

function SectionShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sp-glass sp-glow-hover rounded-2xl border border-white/10 p-5">
      <div className="mb-3 text-xs font-semibold tracking-[0.22em] text-white/60">
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

export function AdminDashboardClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [cafeItems, setCafeItems] = useState<CafeItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [shopDraft, setShopDraft] = useState<Omit<ShopItem, "id">>({
    name: "",
    price: "",
    desc: "",
    img: "",
    featured: false,
  });

  const [cafeDraft, setCafeDraft] = useState<Omit<CafeItem, "id">>({
    name: "",
    price: "",
    desc: "",
    category: "General",
  });

  const [testimonialDraft, setTestimonialDraft] = useState<Omit<Testimonial, "id">>({
    name: "",
    role: "",
    quote: "",
    avatarUrl: "",
  });

  const [testimonialFile, setTestimonialFile] = useState<File | null>(null);

  useEffect(() => {
    void loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      setError(null);

      const [bRes, sRes, cRes, tRes] = await Promise.all([
        fetch("/api/admin/bookings"),
        fetch("/api/admin/shop-items"),
        fetch("/api/admin/cafe-items"),
        fetch("/api/admin/testimonials"),
      ]);

      if (!bRes.ok || !sRes.ok || !cRes.ok || !tRes.ok) {
        throw new Error("Failed to load admin data");
      }

      const [bJson, sJson, cJson, tJson] = await Promise.all([
        bRes.json(),
        sRes.json(),
        cRes.json(),
        tRes.json(),
      ]);

      setBookings(bJson ?? []);
      setShopItems(sJson ?? []);
      setCafeItems(cJson ?? []);
      setTestimonials(tJson ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }

  function resetFeedback() {
    setError(null);
    setSuccess(null);
  }

  async function createShopItem() {
    resetFeedback();
    if (!shopDraft.name.trim() || !shopDraft.price.trim() || !shopDraft.desc.trim() || !shopDraft.img.trim()) {
      setError("Fill all shop item fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shop-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopDraft),
      });
      if (!res.ok) {
        throw new Error("Create failed");
      }
      const json = (await res.json()) as ShopItem;
      setShopItems((prev) => [json, ...prev]);
      setShopDraft({ name: "", price: "", desc: "", img: "", featured: false });
      setSuccess("Shop item created");
    } catch (err) {
      console.error(err);
      setError("Failed to create shop item");
    } finally {
      setLoading(false);
    }
  }

  async function deleteShopItem(id: string) {
    resetFeedback();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/shop-items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setShopItems((prev) => prev.filter((i) => i.id !== id));
      setSuccess("Shop item deleted");
    } catch (err) {
      console.error(err);
      setError("Failed to delete shop item");
    } finally {
      setLoading(false);
    }
  }

  async function createCafeItem() {
    resetFeedback();
    if (!cafeDraft.name.trim() || !cafeDraft.price.trim() || !cafeDraft.desc.trim()) {
      setError("Fill all cafe item fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cafe-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cafeDraft),
      });
      if (!res.ok) {
        throw new Error("Create failed");
      }
      const json = (await res.json()) as CafeItem;
      setCafeItems((prev) => [json, ...prev]);
      setCafeDraft({ name: "", price: "", desc: "", category: "General" });
      setSuccess("Cafe item created");
    } catch (err) {
      console.error(err);
      setError("Failed to create cafe item");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCafeItem(id: string) {
    resetFeedback();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/cafe-items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setCafeItems((prev) => prev.filter((i) => i.id !== id));
      setSuccess("Cafe item deleted");
    } catch (err) {
      console.error(err);
      setError("Failed to delete cafe item");
    } finally {
      setLoading(false);
    }
  }

  async function createTestimonial() {
    resetFeedback();
    if (!testimonialDraft.name.trim() || !testimonialDraft.role.trim() || !testimonialDraft.quote.trim()) {
      setError("Fill name, role and quote for testimonial");
      return;
    }
    setLoading(true);
    try {
      let avatarUrl: string | null = null;
      if (testimonialFile) {
        const fd = new FormData();
        fd.append("file", testimonialFile);
        const uploadRes = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: fd,
        });
        if (!uploadRes.ok) {
          throw new Error("Upload failed");
        }
        const uploadJson = (await uploadRes.json()) as { url: string };
        avatarUrl = uploadJson.url;
      }

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: testimonialDraft.name,
          role: testimonialDraft.role,
          quote: testimonialDraft.quote,
          avatarUrl,
        }),
      });
      if (!res.ok) {
        throw new Error("Create failed");
      }
      const json = (await res.json()) as Testimonial;
      setTestimonials((prev) => [json, ...prev]);
      setTestimonialDraft({ name: "", role: "", quote: "", avatarUrl: "" });
      setTestimonialFile(null);
      setSuccess("Testimonial created");
    } catch (err) {
      console.error(err);
      setError("Failed to create testimonial");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTestimonial(id: string) {
    resetFeedback();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setSuccess("Testimonial deleted");
    } catch (err) {
      console.error(err);
      setError("Failed to delete testimonial");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-100">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-100">
          {success}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <SectionShell title="Bookings">
          <div className="text-2xl font-semibold text-white">
            {bookings.length.toString().padStart(2, "0")}
          </div>
          <p className="mt-1 text-xs text-white/60">
            Latest confirmed bookings stored in MongoDB.
          </p>
          <button
            type="button"
            onClick={() => void loadAll()}
            className="mt-3 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
          >
            Refresh
          </button>
        </SectionShell>
        <SectionShell title="Cafe items">
          <div className="text-2xl font-semibold text-white">
            {cafeItems.length.toString().padStart(2, "0")}
          </div>
          <p className="mt-1 text-xs text-white/60">
            Items currently available on the cafe menu.
          </p>
        </SectionShell>
        <SectionShell title="Shop items">
          <div className="text-2xl font-semibold text-white">
            {shopItems.length.toString().padStart(2, "0")}
          </div>
          <p className="mt-1 text-xs text-white/60">
            Products visible on the public shop page.
          </p>
        </SectionShell>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionShell title="Manage shop">
          <div className="space-y-3 text-xs text-white/80">
            <div className="grid gap-2">
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Name"
                value={shopDraft.name}
                onChange={(e) => setShopDraft((d) => ({ ...d, name: e.target.value }))}
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Price (e.g. ₹7,999+)"
                value={shopDraft.price}
                onChange={(e) => setShopDraft((d) => ({ ...d, price: e.target.value }))}
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Short description"
                value={shopDraft.desc}
                onChange={(e) => setShopDraft((d) => ({ ...d, desc: e.target.value }))}
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Image URL"
                value={shopDraft.img}
                onChange={(e) => setShopDraft((d) => ({ ...d, img: e.target.value }))}
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => void createShopItem()}
              className="mt-1 w-full rounded-xl bg-[var(--sp-red)] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(255,43,60,0.55)] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add shop item"}
            </button>
          </div>

          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto text-xs">
            {shopItems.map((i) => (
              <div
                key={i.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div>
                  <div className="text-xs font-semibold text-white/90">{i.name}</div>
                  <div className="text-[11px] text-white/60">{i.price}</div>
                </div>
                <button
                  type="button"
                  onClick={() => void deleteShopItem(i.id)}
                  className="text-[10px] text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
            {shopItems.length === 0 ? (
              <div className="text-[11px] text-white/50">No shop items yet.</div>
            ) : null}
          </div>
        </SectionShell>

        <SectionShell title="Manage cafe">
          <div className="space-y-3 text-xs text-white/80">
            <div className="grid gap-2">
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Name"
                value={cafeDraft.name}
                onChange={(e) => setCafeDraft((d) => ({ ...d, name: e.target.value }))}
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Price (e.g. ₹199)"
                value={cafeDraft.price}
                onChange={(e) => setCafeDraft((d) => ({ ...d, price: e.target.value }))}
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Short description"
                value={cafeDraft.desc}
                onChange={(e) => setCafeDraft((d) => ({ ...d, desc: e.target.value }))}
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Category (e.g. Coffee, Snacks)"
                value={cafeDraft.category}
                onChange={(e) => setCafeDraft((d) => ({ ...d, category: e.target.value }))}
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => void createCafeItem()}
              className="mt-1 w-full rounded-xl bg-[var(--sp-red)] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(255,43,60,0.55)] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add cafe item"}
            </button>
          </div>

          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto text-xs">
            {cafeItems.map((i) => (
              <div
                key={i.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div>
                  <div className="text-xs font-semibold text-white/90">
                    {i.name} <span className="text-[10px] text-white/55">({i.category})</span>
                  </div>
                  <div className="text-[11px] text-white/60">{i.price}</div>
                </div>
                <button
                  type="button"
                  onClick={() => void deleteCafeItem(i.id)}
                  className="text-[10px] text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
            {cafeItems.length === 0 ? (
              <div className="text-[11px] text-white/50">No cafe items yet.</div>
            ) : null}
          </div>
        </SectionShell>
      </div>

      <SectionShell title="Recent bookings">
        <div className="max-h-72 overflow-y-auto text-xs">
          {bookings.length === 0 ? (
            <div className="text-[11px] text-white/50">
              No bookings stored in MongoDB yet.
            </div>
          ) : (
            <table className="w-full border-separate border-spacing-y-1 text-left text-[11px] text-white/80">
              <thead className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                <tr>
                  <th className="px-2 py-1">When</th>
                  <th className="px-2 py-1">Simulator</th>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Contact</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="rounded-xl bg-white/5">
                    <td className="rounded-l-xl px-2 py-1">
                      {b.date} • {b.time}
                    </td>
                    <td className="px-2 py-1">{b.simulator}</td>
                    <td className="px-2 py-1">{b.name}</td>
                    <td className="rounded-r-xl px-2 py-1">
                      <div>{b.phone}</div>
                      <div className="text-[10px] text-white/55">{b.email}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </SectionShell>

      <SectionShell title="Testimonials / blog quotes">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
          <div className="space-y-3 text-xs text-white/80">
            <div className="grid gap-2">
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Name"
                value={testimonialDraft.name}
                onChange={(e) =>
                  setTestimonialDraft((d) => ({
                    ...d,
                    name: e.target.value,
                  }))
                }
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Role (e.g. F1 Fan, Esports)"
                value={testimonialDraft.role}
                onChange={(e) =>
                  setTestimonialDraft((d) => ({
                    ...d,
                    role: e.target.value,
                  }))
                }
              />
              <textarea
                className="min-h-[80px] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Quote"
                value={testimonialDraft.quote}
                onChange={(e) =>
                  setTestimonialDraft((d) => ({
                    ...d,
                    quote: e.target.value,
                  }))
                }
              />
              <input
                type="file"
                accept="image/*"
                className="text-[11px] text-white/70"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setTestimonialFile(file);
                }}
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => void createTestimonial()}
              className="mt-1 w-full rounded-xl bg-[var(--sp-red)] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(255,43,60,0.55)] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add testimonial"}
            </button>
            <p className="text-[11px] text-white/50">
              These quotes can power your homepage reviews section or a dedicated blog/press page.
            </p>
          </div>

          <div className="max-h-64 space-y-2 overflow-y-auto text-xs">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div className="flex items-start gap-2">
                  {t.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-white/10" />
                  )}
                  <div>
                    <div className="text-xs font-semibold text-white/90">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {t.role}
                    </div>
                    <div className="mt-1 line-clamp-2 text-[11px] text-white/70">
                      “{t.quote}”
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void deleteTestimonial(t.id)}
                  className="text-[10px] text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
            {testimonials.length === 0 ? (
              <div className="text-[11px] text-white/50">
                No testimonials yet. Add a few to power your reviews/blog sections.
              </div>
            ) : null}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

