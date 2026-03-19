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
  mrp?: string | null;
  salePrice?: string | null;
  points?: number | null;
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

type RaceMode = {
  id: string;
  name: string;
  price: string;
  note: string;
  points: number | null;
  accent: "primary" | "secondary" | "default";
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
  const [raceModes, setRaceModes] = useState<RaceMode[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [shopDraft, setShopDraft] = useState<
    Omit<ShopItem, "id" | "featured" | "mrp" | "salePrice" | "points">
  >({
    name: "",
    price: "",
    desc: "",
    img: "",
  });
  const [shopImageFile, setShopImageFile] = useState<File | null>(null);

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

  const [raceModeDraft, setRaceModeDraft] = useState<Omit<RaceMode, "id">>({
    name: "",
    price: "",
    note: "",
    points: null,
    accent: "primary",
  });

  const [activeTab, setActiveTab] = useState<
    "overview" | "shop" | "cafe" | "raceModes" | "bookings" | "testimonials"
  >("overview");

  useEffect(() => {
    void loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      setError(null);

      const [bRes, sRes, cRes, tRes, rRes] = await Promise.all([
        fetch("/api/admin/bookings"),
        fetch("/api/admin/shop-items"),
        fetch("/api/admin/cafe-items"),
        fetch("/api/admin/testimonials"),
        fetch("/api/admin/race-modes"),
      ]);

      if (!bRes.ok || !sRes.ok || !cRes.ok || !tRes.ok || !rRes.ok) {
        throw new Error("Failed to load admin data");
      }

      const [bJson, sJson, cJson, tJson, rJson] = await Promise.all([
        bRes.json(),
        sRes.json(),
        cRes.json(),
        tRes.json(),
        rRes.json(),
      ]);

      setBookings(bJson ?? []);
      setShopItems(sJson ?? []);
      setCafeItems(cJson ?? []);
      setTestimonials(tJson ?? []);
      setRaceModes(rJson ?? []);
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
    if (!shopDraft.name.trim() || !shopDraft.price.trim() || !shopDraft.desc.trim()) {
      setError("Fill name, price, and description for the shop item");
      return;
    }
    if (!shopImageFile) {
      setError("Upload an image for the shop item");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", shopImageFile);
      const uploadRes = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: fd,
      });
      if (!uploadRes.ok) {
        throw new Error("Image upload failed");
      }
      const uploadJson = (await uploadRes.json()) as { url: string };
      const imgUrl = uploadJson.url;

      const res = await fetch("/api/admin/shop-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: shopDraft.name,
          price: shopDraft.price,
          desc: shopDraft.desc,
          img: imgUrl,
        }),
      });
      if (!res.ok) {
        throw new Error("Create failed");
      }
      const json = (await res.json()) as ShopItem;
      setShopItems((prev) => [json, ...prev]);
      setShopDraft({ name: "", price: "", desc: "", img: "" });
      setShopImageFile(null);
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

  async function createRaceMode() {
    resetFeedback();
    if (!raceModeDraft.name.trim() || !raceModeDraft.price.trim()) {
      setError("Fill at least name and price for race mode");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/race-modes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raceModeDraft),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Create race mode failed", body);
        throw new Error("Create failed");
      }
      const json = (await res.json()) as RaceMode;
      setRaceModes((prev) => [json, ...prev]);
      setRaceModeDraft({ name: "", price: "", note: "", points: null, accent: "primary" });
      setSuccess("Race mode created");
    } catch (err) {
      console.error(err);
      setError("Failed to create race mode");
    } finally {
      setLoading(false);
    }
  }

  async function updateRaceMode(id: string, patch: Partial<RaceMode>) {
    resetFeedback();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/race-modes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Update race mode failed", body);
        throw new Error("Update failed");
      }
      const json = (await res.json()) as RaceMode;
      setRaceModes((prev) => prev.map((m) => (m.id === id ? json : m)));
      setSuccess("Race mode updated");
    } catch (err) {
      console.error(err);
      setError("Failed to update race mode");
    } finally {
      setLoading(false);
    }
  }

  async function deleteRaceMode(id: string) {
    resetFeedback();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/race-modes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Delete race mode failed", body);
        throw new Error("Delete failed");
      }
      setRaceModes((prev) => prev.filter((m) => m.id !== id));
      setSuccess("Race mode deleted");
    } catch (err) {
      console.error(err);
      setError("Failed to delete race mode");
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

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] ${
            activeTab === "overview"
              ? "bg-white text-black"
              : "border border-white/20 bg-white/5 text-white/70"
          }`}
        >
          OVERVIEW
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("shop")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] ${
            activeTab === "shop"
              ? "bg-white text-black"
              : "border border-white/20 bg-white/5 text-white/70"
          }`}
        >
          SHOP
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cafe")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] ${
            activeTab === "cafe"
              ? "bg-white text-black"
              : "border border-white/20 bg-white/5 text-white/70"
          }`}
        >
          CAFE
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("raceModes")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] ${
            activeTab === "raceModes"
              ? "bg-white text-black"
              : "border border-white/20 bg-white/5 text-white/70"
          }`}
        >
          RACE MODES
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] ${
            activeTab === "bookings"
              ? "bg-white text-black"
              : "border border-white/20 bg-white/5 text-white/70"
          }`}
        >
          BOOKINGS
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("testimonials")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] ${
            activeTab === "testimonials"
              ? "bg-white text-black"
              : "border border-white/20 bg-white/5 text-white/70"
          }`}
        >
          TESTIMONIALS
        </button>
      </div>

      {activeTab === "overview" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
          <SectionShell title="Race modes">
            <div className="text-2xl font-semibold text-white">
              {raceModes.length.toString().padStart(2, "0")}
            </div>
            <p className="mt-1 text-xs text-white/60">
              Cards powering the &quot;Choose your race mode&quot; section.
            </p>
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
          <SectionShell title="Testimonials">
            <div className="text-2xl font-semibold text-white">
              {testimonials.length.toString().padStart(2, "0")}
            </div>
            <p className="mt-1 text-xs text-white/60">
              Quotes powering homepage and testimonials page.
            </p>
          </SectionShell>
        </div>
      ) : null}

      {activeTab === "shop" ? (
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
                placeholder="Display price (e.g. ₹7,999)"
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
                type="file"
                accept="image/*"
                className="text-[11px] text-white/70"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setShopImageFile(file);
                }}
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
      ) : null}

      {activeTab === "cafe" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionShell title="Manage cafe menu">
            <p className="text-xs text-white/70">
              These items appear on the cafe page and homepage cafe section.
            </p>
            {/* Reuse existing Manage cafe UI */}
          </SectionShell>
        </div>
      ) : null}

      {activeTab === "raceModes" ? (
        <div className="grid gap-5 lg:grid-cols-2">
        <SectionShell title="Race modes — add / edit">
          <div className="space-y-3 text-xs text-white/80">
            <div className="grid gap-2">
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Mode name (e.g. Single Race)"
                value={raceModeDraft.name}
                onChange={(e) =>
                  setRaceModeDraft((d) => ({
                    ...d,
                    name: e.target.value,
                  }))
                }
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Price (e.g. ₹299)"
                value={raceModeDraft.price}
                onChange={(e) =>
                  setRaceModeDraft((d) => ({
                    ...d,
                    price: e.target.value,
                  }))
                }
              />
              <input
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Short note (e.g. Quick session • Perfect for first-timers)"
                value={raceModeDraft.note}
                onChange={(e) =>
                  setRaceModeDraft((d) => ({
                    ...d,
                    note: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90 placeholder:text-white/35"
                placeholder="Points (optional)"
                value={raceModeDraft.points ?? ""}
                onChange={(e) =>
                  setRaceModeDraft((d) => ({
                    ...d,
                    points: e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
              />
              <select
                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/90"
                value={raceModeDraft.accent}
                onChange={(e) =>
                  setRaceModeDraft((d) => ({
                    ...d,
                    accent: e.target.value as RaceMode["accent"],
                  }))
                }
              >
                <option value="primary">Primary highlight</option>
                <option value="secondary">Secondary</option>
                <option value="default">Default</option>
              </select>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => void createRaceMode()}
              className="mt-1 w-full rounded-xl bg-[var(--sp-red)] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(255,43,60,0.55)] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add race mode"}
            </button>
          </div>
        </SectionShell>

        <SectionShell title="Race modes — current cards">
          <div className="max-h-64 space-y-2 overflow-y-auto text-xs">
            {raceModes.map((m) => (
              <div
                key={m.id}
                className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    className="w-1/2 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-white/90"
                    value={m.name}
                    onChange={(e) =>
                      setRaceModes((prev) =>
                        prev.map((x) => (x.id === m.id ? { ...x, name: e.target.value } : x)),
                      )
                    }
                    onBlur={(e) => void updateRaceMode(m.id, { name: e.target.value })}
                  />
                  <input
                    className="w-24 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-white/90"
                    value={m.price}
                    onChange={(e) =>
                      setRaceModes((prev) =>
                        prev.map((x) => (x.id === m.id ? { ...x, price: e.target.value } : x)),
                      )
                    }
                    onBlur={(e) => void updateRaceMode(m.id, { price: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-20 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-white/90"
                    value={m.points ?? ""}
                    onChange={(e) =>
                      setRaceModes((prev) =>
                        prev.map((x) => ({
                          ...x,
                          points: e.target.value === "" ? null : Number(e.target.value),
                        })),
                      )
                    }
                    onBlur={(e) =>
                      void updateRaceMode(m.id, {
                        points: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </div>
                <textarea
                  className="min-h-[48px] rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-white/90"
                  value={m.note}
                  onChange={(e) =>
                    setRaceModes((prev) =>
                      prev.map((x) => (x.id === m.id ? { ...x, note: e.target.value } : x)),
                    )
                  }
                  onBlur={(e) => void updateRaceMode(m.id, { note: e.target.value })}
                />
                <div className="flex items-center justify-between gap-2">
                  <select
                    className="w-32 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-white/90"
                    value={m.accent}
                    onChange={(e) => {
                      const value = e.target.value as RaceMode["accent"];
                      setRaceModes((prev) =>
                        prev.map((x) => (x.id === m.id ? { ...x, accent: value } : x)),
                      );
                      void updateRaceMode(m.id, { accent: value });
                    }}
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="default">Default</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => void deleteRaceMode(m.id)}
                    className="text-[10px] text-red-300 hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {raceModes.length === 0 ? (
              <div className="text-[11px] text-white/50">
                No race modes yet. Add a few cards to power the homepage race mode section.
              </div>
            ) : null}
          </div>
        </SectionShell>
      </div>
      ) : null}

      {activeTab === "bookings" ? (
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
      ) : null}

      {activeTab === "testimonials" ? (
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
      ) : null}
    </div>
  );
}

