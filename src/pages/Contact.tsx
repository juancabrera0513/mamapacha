// src/pages/Contact.tsx
import React from "react";
import { SOCIAL } from "@/data/site";
import PressCTA from "@/components/PressCTA";

export default function ContactPage() {
  const emailHref = SOCIAL.email || "mailto:hello@mamapachasabor.com";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = encodeURIComponent(subject || `Message from ${name || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    const href = emailHref.startsWith("mailto:")
      ? `${emailHref}?subject=${sub}&body=${body}`
      : `mailto:hello@mamapachasabor.com?subject=${sub}&body=${body}`;
    window.location.href = href;
  };

  return (
    <main className="relative">
      {/* Fondo banner */}
      <div className="absolute inset-0 -z-10 bg-[#41C1CC]/15" aria-hidden />

      {/* Hero */}
      <section
        className="relative"
        style={{ paddingTop: "var(--header-h, 36px)" }}
      >
        <div className="container-xl py-10 sm:py-14">
          <div className="rounded-3xl bg-[#41C1CC] text-white p-6 sm:p-8 flex flex-col lg:flex-row items-start gap-6 lg:items-center lg:justify-between">
            <div>
              <p className="uppercase tracking-[0.18em] text-sm/6 font-semibold">
                Contact
              </p>
              <h1 className="font-serif text-4xl font-extrabold tracking-tight mt-1">
                Let’s talk
              </h1>
              <p className="mt-2 text-white/90">
                Questions, wholesale, partnerships or catering—send us a note.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={emailHref}
                className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-white text-[#0b5e63] hover:bg-neutral-100 transition"
              >
                Email us
              </a>
              <PressCTA label="Press inquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="relative">
        <div className="container-xl pb-14">
          <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr]">
            {/* Info */}
            <aside className="order-2 lg:order-1">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h2 className="text-xl font-semibold">Contact details</h2>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  {SOCIAL.email && (
                    <li>
                      <span className="font-semibold">Email:</span>{" "}
                      <a className="underline" href={SOCIAL.email}>
                        {SOCIAL.email.replace("mailto:", "")}
                      </a>
                    </li>
                  )}
                  {SOCIAL.instagram && (
                    <li>
                      <span className="font-semibold">Instagram:</span>{" "}
                      <a className="underline" href={SOCIAL.instagram} target="_blank" rel="noreferrer">
                        @mamapachasabor
                      </a>
                    </li>
                  )}
                  {SOCIAL.facebook && (
                    <li>
                      <span className="font-semibold">Facebook:</span>{" "}
                      <a className="underline" href={SOCIAL.facebook} target="_blank" rel="noreferrer">
                        facebook.com/mamapachasabor
                      </a>
                    </li>
                  )}
                  {SOCIAL.tiktok && (
                    <li>
                      <span className="font-semibold">TikTok:</span>{" "}
                      <a className="underline" href={SOCIAL.tiktok} target="_blank" rel="noreferrer">
                        @mamapachasabor
                      </a>
                    </li>
                  )}
                </ul>

                <div className="mt-6 rounded-xl bg-[#41C1CC]/10 p-4 text-sm text-neutral-800">
                  For catering requests, include date, headcount, dietary needs, and pickup/delivery.
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="order-1 lg:order-2">
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <h2 className="text-xl font-semibold">Send us a message</h2>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-800">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 555-5555"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-800">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-800">
                      Message
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us a bit about your request…"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="reset"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm font-semibold hover:bg-neutral-50"
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setPhone("");
                      setSubject("");
                      setMessage("");
                    }}
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#E7303A] px-5 text-sm font-semibold text-white hover:bg-[#c3252e] transition"
                  >
                    Send message
                  </button>
                </div>

              
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
