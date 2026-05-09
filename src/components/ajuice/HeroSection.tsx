'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { fruitEmojis } from '@/lib/data';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 animate-mesh"
        style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 15%, #f0f9ff 30%, #ecfeff 45%, #f0f9ff 60%, #e0f2fe 75%, #f0f9ff 90%, #ecfeff 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/30 rounded-full blur-3xl" />

      {/* Floating fruits */}
      {fruitEmojis.map((fruit, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none opacity-60 md:opacity-80"
          style={{
            left: fruit.x,
            top: fruit.y,
            fontSize: fruit.size * 0.6,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: fruit.delay,
            ease: 'easeInOut',
          }}
        >
          {fruit.emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div
            className="text-center md:text-left"
            style={mounted ? { transform: `translateY(${scrollY * 0.1}px)` } : undefined}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Premium Fresh Juice
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="gradient-text">Fresh Healthy</span>
              <br />
              <span className="text-gray-900">Juice Everyday</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Jus buah dan sayuran segar dengan kualitas premium untuk hidup lebih sehat. Tanpa pengawet, 100% alami.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold rounded-full hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-xl hover:shadow-sky-300/40 transform hover:-translate-y-1"
              >
                Order Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sky-200 text-sky-600 font-bold rounded-full hover:bg-sky-50 hover:border-sky-300 transition-all duration-300"
              >
                Lihat Menu
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
              {[
                { value: '9+', label: 'Varian Jus' },
                { value: '100%', label: 'Alami' },
                { value: '5\u2605', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div
            className="relative flex items-center justify-center"
            style={mounted ? { transform: `translateY(${scrollY * -0.05}px)` } : undefined}
          >
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full opacity-60 blur-sm" />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/hero-juice.png"
                  alt="Ajuice Fresh Juice Collection"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl shadow-lg flex items-center justify-center text-2xl"
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              🍎
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-5 w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg flex items-center justify-center text-2xl"
              animate={{ y: [0, -12, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              🥕
            </motion.div>
            <motion.div
              className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center text-xl"
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              🥝
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#products" className="flex flex-col items-center gap-2 text-gray-400 hover:text-sky-500 transition-colors">
          <span className="text-xs font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
