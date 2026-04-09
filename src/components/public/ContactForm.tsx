"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Failed to send message");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none focus:ring-2 focus:ring-kp-green-700/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none focus:ring-2 focus:ring-kp-green-700/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-3 text-sm focus:border-kp-green-700 focus:outline-none focus:ring-2 focus:ring-kp-green-700/20 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-kp-green-800 px-8 py-3.5 text-sm font-medium text-white hover:bg-kp-green-700 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      {status === "ok" && (
        <p className="text-sm text-kp-green-700">
          Thanks — we&apos;ll get back to you shortly.
        </p>
      )}
      {status === "err" && error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
