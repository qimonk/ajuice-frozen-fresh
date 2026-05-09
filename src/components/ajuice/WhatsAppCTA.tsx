'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppCTA() {
  const waUrl = "https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus.";

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors wa-pulse"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
    </a>
  );
}
