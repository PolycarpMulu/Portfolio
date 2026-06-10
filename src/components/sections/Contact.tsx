"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { bio } from "@/data/bio";

// Field names here MUST match public/__forms.html: form-name, name, email,
// subject, message, bot-field.
const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

const inputClass =
  "w-full border border-border-dim bg-surface px-4 py-3 font-body text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40";
const labelClass =
  "block font-mono text-xs uppercase tracking-[0.2em] text-accent";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [botField, setBotField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const links = [
    { label: "GitHub", href: bio.social.github },
    { label: "X", href: bio.social.twitter },
    { label: "LinkedIn", href: bio.social.linkedin },
  ].filter((l) => l.href !== "");

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("All fields are required.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...form,
          "bot-field": botField,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setIsSuccess(true);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again shortly.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// CONTACT"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Get in touch
        </h2>

        <div className="mt-10 grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            {isSuccess ? (
              <p className="font-mono text-accent">
                {"// MESSAGE TRANSMITTED. I'll be in touch."}
              </p>
            ) : (
              <form
                name="contact"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Honeypot — hidden from humans; bots fill it. */}
                <p className="hidden">
                  <label>
                    Do not fill this out:{" "}
                    <input
                      name="bot-field"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      className={`mt-2 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      className={`mt-2 ${inputClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={update("subject")}
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className={`mt-2 resize-y ${inputClass}`}
                  />
                </div>

                {error && (
                  <p className="font-mono text-sm text-danger">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-accent px-6 py-3 font-display text-sm font-bold text-void transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? "Transmitting…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <aside>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Elsewhere
            </p>
            {links.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-accent transition-colors hover:text-fg"
                    >
                      {l.label} →
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 max-w-xs text-sm text-muted">
              Prefer the form — it routes straight to my inbox with spam filtering.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
