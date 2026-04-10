"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ link }: { link?: string }) {
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 active:scale-95 kp-animate-bounce-in"
      style={{ animationDelay: "1s" }}
    >
      <MessageCircle className="h-6 w-6" fill="white" strokeWidth={0} />
      {/* Ping ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </a>
  );
}
