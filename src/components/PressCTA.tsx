// src/components/PressCTA.tsx
import React from "react";
import PressModal from "@/components/PressModal";

type Props = {
  label?: string;
  variant?: "button" | "link";
  className?: string;
};

export default function PressCTA({
  label = "For press inquiries complete this form",
  variant = "button",
  className = "",
}: Props) {
  const [open, setOpen] = React.useState(false);

  if (variant === "link") {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className={`underline underline-offset-4 hover:opacity-80 ${className}`}
        >
          {label}
        </button>
        <PressModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#E7303A] text-white hover:bg-[#c3252e] transition ${className}`}
      >
        {label}
      </button>
      <PressModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
