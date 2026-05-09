'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const waUrl =
    'https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus.';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full mb-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      >
        Chat via WhatsApp
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </motion.div>

      {/* Ripple effect */}
      {isHovered && (
        <span className="absolute w-14 h-14 sm:w-16 sm:h-16 bg-green-400/30 rounded-full wa-ripple" />
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 wa-pulse group"
        aria-label="Chat WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
