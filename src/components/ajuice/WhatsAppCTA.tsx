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
        transition={{ duration: 0.25 }}
        className="absolute bottom-full mb-3 px-3.5 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      >
        Chat via WhatsApp
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90" />
      </motion.div>

      {/* Ripple effect */}
      {isHovered && (
        <span className="absolute w-16 h-16 bg-green-400/25 rounded-full wa-ripple" />
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-15 h-15 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-300/30 hover:shadow-green-400/40 transition-all duration-400 hover:scale-110 wa-pulse group"
        style={{ width: '60px', height: '60px' }}
        aria-label="Chat WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
}
