'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '@/lib/data';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      // Smooth ease out
      const eased = 1 - Math.pow(1 - pct, 4);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);

    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cinematic gradient background */}
          <div
            className="absolute inset-0 animate-mesh"
            style={{
              background:
                'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 15%, #ede9fe 30%, #fce7f3 45%, #d1fae5 60%, #f0f9ff 75%, #ecfeff 90%, #f0f9ff 100%)',
              backgroundSize: '400% 400%',
            }}
          />

          {/* Liquid blobs behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72">
            <div
              className="absolute inset-0 bg-gradient-to-br from-sky-200/35 to-cyan-100/25 rounded-full animate-blob-1"
              style={{ animationDuration: '9s' }}
            />
            <div
              className="absolute inset-6 bg-gradient-to-br from-violet-200/25 to-sky-100/20 rounded-full animate-blob-2"
              style={{ animationDuration: '12s' }}
            />
            <div
              className="absolute inset-12 bg-gradient-to-br from-emerald-100/20 to-cyan-50/15 rounded-full animate-blob-3"
              style={{ animationDuration: '7s' }}
            />
          </div>

          {/* Logo with spring animation */}
          <motion.div
            initial={{ scale: 0, rotate: -200, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              type: 'spring',
              stiffness: 180,
              damping: 18,
            }}
            className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-sky-300/40 mb-7"
            style={{ width: '88px', height: '88px' }}
          >
            <span className="text-white font-bold text-3xl sm:text-4xl">A</span>
            {/* Spinning ring */}
            <motion.div
              className="absolute inset-[-5px] rounded-2xl border-2 border-sky-300/20"
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-[-10px] rounded-2xl border border-cyan-300/10"
              animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.3, 0.1], rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Brand name with blur reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-bold gradient-text mb-2"
          >
            {BRAND_NAME}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-gray-400 text-sm mb-8 tracking-wide"
          >
            Frozen & Fresh
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-52 sm:w-60 h-2 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-white/30"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </motion.div>

          {/* Percentage display */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-300 text-xs font-mono mt-3 tracking-widest"
          >
            {progress}%
          </motion.span>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ delay: 1, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gray-400 text-sm mt-4"
          >
            Menyiapkan kesegaran...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
