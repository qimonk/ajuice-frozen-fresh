'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '@/lib/data';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const startTime = Date.now();
    const duration = 2000;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);

    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 animate-mesh"
            style={{
              background:
                'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 20%, #ede9fe 40%, #fce7f3 60%, #f0f9ff 80%, #ecfeff 100%)',
              backgroundSize: '400% 400%',
            }}
          />

          {/* Liquid blob animation behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64">
            <div
              className="absolute inset-0 bg-gradient-to-br from-sky-200/40 to-cyan-100/40 rounded-full animate-blob-1"
              style={{ animationDuration: '8s' }}
            />
            <div
              className="absolute inset-4 bg-gradient-to-br from-cyan-200/30 to-sky-100/30 rounded-full animate-blob-2"
              style={{ animationDuration: '10s' }}
            />
          </div>

          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-sky-300/40 mb-6"
          >
            <span className="text-white font-bold text-3xl sm:text-4xl">A</span>
            {/* Ring animation */}
            <motion.div
              className="absolute inset-[-4px] rounded-2xl border-2 border-sky-300/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Brand name reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-bold gradient-text mb-2"
          >
            {BRAND_NAME}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="text-gray-400 text-sm mb-8"
          >
            Frozen & Fresh
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-48 sm:w-56 h-2 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-gray-200/30"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Loading text with opacity pulse */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ delay: 0.8, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gray-400 text-sm mt-4"
          >
            Menyiapkan kesegaran...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
