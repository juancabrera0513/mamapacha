// src/sections/Contact.tsx
import React from "react";
import { SOCIAL } from "@/data/site";
import PressCTA from "@/components/PressCTA";

export default function Contact() {
  const emailHref = SOCIAL.email || "mailto:hello@mamapachasabor.com";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const nameRef = React.useRef<HTMLInputElement | null>(null);

  const isPristine =
    !name.trim() && !email.trim() && !phone.trim() && !subject.trim() && !message.trim();

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

  const onClear = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    formRef.current?.reset();
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  return (
    <section id="contact" className="px-4 sm:px-6 py-14 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado para fondos de color */}
        <div className="text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 ring-1 ring-white/30 px-3 py-1 text-xs font-semibold tracking-wider">
            CONTACT
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-extrabold drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
            Catering & Contact
          </h2>
          <p className="mt-2 text-white/90">
            Questions, wholesale, partnerships or catering—send us a note.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white ring-1 ring-black/10 shadow-sm p-5 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr]">
            {/* Info */}
            <aside>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-neutral-900">Contact details</h3>
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

                <div className="mt-6 rounded-xl bg-[#1cbbc7]/10 p-4 text-sm text-neutral-800">
                  For catering requests, include date, headcount, dietary needs, and pickup/delivery.
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={emailHref}
                    className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#1cbbc7] text-white hover:opacity-90 transition"
                  >
                    Email us
                  </a>
                  <PressCTA label="Press inquiry" />
                </div>
              </div>
            </aside>

            {/* Form */}
            <div>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <h3 className="text-xl font-semibold text-neutral-900">Send us a message</h3>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">Name</label>
                    <input
                      ref={nameRef}
                      type="text"
                      className="mt-1 w-full h-11 rounded-xl border border-neutral-300 px-3 bg-white text-neutral-900 placeholder-neutral-400 caret-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#1cbbc7]/50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full h-11 rounded-xl border border-neutral-300 px-3 bg-white text-neutral-900 placeholder-neutral-400 caret-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#1cbbc7]/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-800">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 w-full h-11 rounded-xl border border-neutral-300 px-3 bg-white text-neutral-900 placeholder-neutral-400 caret-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#1cbbc7]/50"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-800">Subject</label>
                    <input
                      type="text"
                      className="mt-1 w-full h-11 rounded-xl border border-neutral-300 px-3 bg-white text-neutral-900 placeholder-neutral-400 caret-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#1cbbc7]/50"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-800">Message</label>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 min-h-[140px] bg-white text-neutral-900 placeholder-neutral-400 caret-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#1cbbc7]/50"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us a bit about your request…"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  {/* CLEAR en marca roja */}
                  <button
                    type="button"
                    onClick={onClear}
                    disabled={isPristine}
                    className={[
                      "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition",
                      isPristine
                        ? "border border-neutral-200 text-neutral-300 cursor-not-allowed"
                        : "border-2 border-[#e33c30] text-[#e33c30] hover:bg-[#e33c30] hover:text-white"
                    ].join(" ")}
                    aria-disabled={isPristine}
                    aria-label="Clear form fields"
                    title={isPristine ? "Nothing to clear" : "Clear all fields"}
                  >
                    Clear
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#e33c30] px-5 text-sm font-semibold text-white hover:bg-[#c72b27] transition"
                  >
                    Send message
                  </button>
                </div>

                {/* Fix para Chrome autofill (texto oscuro) */}
                <style>{`
                  input:-webkit-autofill,
                  textarea:-webkit-autofill {
                    -webkit-text-fill-color: #111827 !important; /* neutral-900 */
                    transition: background-color 9999s ease-in-out 0s;
                  }
                `}</style>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
