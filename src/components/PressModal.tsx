// src/components/PressModal.tsx
import React from "react";
import Modal from "./Modal";
import { SOCIAL } from "@/data/site";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PressModal({ open, onClose }: Props) {
  const [name, setName] = React.useState("");
  const [outlet, setOutlet] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const pressEmail = SOCIAL.email || "mailto:hello@mamapachasabor.com";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Press Inquiry — ${name || "Name"} — ${outlet || "Outlet"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nOutlet: ${outlet}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const href = pressEmail.startsWith("mailto:")
      ? `${pressEmail}?subject=${subject}&body=${body}`
      : `mailto:hello@mamapachasabor.com?subject=${subject}&body=${body}`;
    window.location.href = href;
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Press inquiry" maxWidthClass="max-w-2xl">
      <form onSubmit={onSubmit} className="p-5">
        <h3 className="text-xl font-semibold">Press Inquiry</h3>
        <p className="mt-1 text-sm text-neutral-600">
          Tell us a bit about your outlet and the story you’d like to cover.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-800">Name</label>
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
            <label className="block text-sm font-medium text-neutral-800">Outlet</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
              value={outlet}
              onChange={(e) => setOutlet(e.target.value)}
              placeholder="Publication / Channel"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-800">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-800">Message</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your story, timeline, format, etc."
              required
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm font-semibold hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#E7303A] px-5 text-sm font-semibold text-white hover:bg-[#c3252e]"
          >
            Send inquiry
          </button>
        </div>
      </form>
    </Modal>
  );
}
