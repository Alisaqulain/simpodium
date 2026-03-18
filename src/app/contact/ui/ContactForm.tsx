"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function fieldBase() {
  return "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,43,60,0.35)]";
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const canSend = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.message.trim().length >= 8 &&
      form.email.includes("@")
    );
  }, [form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        setSent(true);
        setTimeout(() => setSent(false), 3500);
        setForm({ name: "", email: "", phone: "", message: "" });
      }}
      className="grid gap-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className={fieldBase()}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
        />
        <input
          className={fieldBase()}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
          inputMode="email"
        />
      </div>
      <input
        className={fieldBase()}
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
        inputMode="tel"
      />
      <textarea
        className={fieldBase()}
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
        rows={6}
        required
      />
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-white/50">
          {sent ? (
            <span className="text-white/75">
              Message queued. We’ll get back to you shortly.
            </span>
          ) : (
            "We typically respond within a few hours."
          )}
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send Message
        </Button>
      </div>
    </form>
  );
}

