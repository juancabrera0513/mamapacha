import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-serif text-center">Catering & Contact</h2>
      <p className="text-center text-neutral-600 mt-2">Tell us about your event or questions—happy to help.</p>

      <form
        className="mt-8 max-w-2xl mx-auto grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("This is a demo form. Hook up your handler here.");
        }}
      >
        <input className="h-11 rounded-xl border border-neutral-300 px-4" placeholder="Your name" required />
        <input type="email" className="h-11 rounded-xl border border-neutral-300 px-4" placeholder="Email" required />
        <textarea className="min-h-[120px] rounded-xl border border-neutral-300 px-4 py-3" placeholder="Message" />
        <button
          className="h-11 rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition"
          type="submit"
        >
          Send
        </button>
      </form>
    </section>
  );
}
