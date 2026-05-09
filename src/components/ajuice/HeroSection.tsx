'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '9+', label: 'Varian Jus' },
  { value: '100%', label: 'Alami' },
  { value: '5\u2605', label: 'Rating' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax scroll effects
  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-blur-1', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to('.hero-blur-2', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse reactive
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Animated stats counter
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 animate-mesh"
        style={{
          background:
            'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 10%, #fef3c7 25%, #fce7f3 40%, #f0f9ff 55%, #d1fae5 70%, #ede9fe 85%, #f0f9ff 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Liquid animated blur blobs - depth layers */}
      <div className="hero-blur-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-br from-sky-200/40 to-cyan-100/30 rounded-full animate-blur-pulse-1" />
      <div className="hero-blur-2 absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-rose-100/30 to-amber-50/40 rounded-full animate-blur-pulse-2" />
      <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-gradient-to-br from-violet-100/20 to-emerald-50/20 rounded-full animate-blob-1 opacity-60" />
      <div className="absolute top-[60%] left-[20%] w-[300px] h-[300px] bg-gradient-to-br from-pink-100/20 to-sky-50/20 rounded-full animate-blob-2 opacity-50" />
      <div className="absolute top-[20%] right-[30%] w-[350px] h-[350px] bg-gradient-to-br from-amber-100/25 to-emerald-50/15 rounded-full animate-blob-3 opacity-50" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div ref={textRef} className="text-center md:text-left">
            {/* Badge with glow pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-sky-700 text-sm font-medium mb-6 border border-sky-100/50 glow-effect-soft"
            >
              <Sparkles className="w-4 h-4" />
              <span>Premium Fresh Juice</span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Cinematic heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text-cinematic">Fresh Healthy</span>
              </motion.span>
              <motion.span
                className="block text-gray-900 mt-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                Juice Everyday
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg sm:text-xl text-gray-500 max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Jus buah dan sayuran segar dengan kualitas premium untuk hidup lebih sehat.
              Tanpa pengawet, 100% alami, fresh setiap hari.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 text-white font-bold rounded-full shadow-xl shadow-sky-300/30 hover:shadow-sky-400/50 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Order Sekarang</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sky-200/80 text-sky-600 font-bold rounded-full hover:bg-sky-50/80 hover:border-sky-300 transition-all duration-500 backdrop-blur-sm"
              >
                Lihat Menu
              </a>
            </motion.div>

            {/* Stats counter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero image area - mouse reactive */}
          <div ref={imageRef} className="relative flex items-center justify-center">
            {/* Background glow circles */}
            <div
              className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
                transform: mounted ? `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` : undefined,
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              style={{
                transform: mounted ? `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` : undefined,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-1 ring-white/50">
                <Image
                  src="/hero-juice.png"
                  alt="Ajuice Fresh Juice Collection"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />
                {/* Shine overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating decorative elements with parallax */}
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl shadow-lg flex items-center justify-center text-2xl"
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                transform: mounted ? `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)` : undefined,
                transition: 'transform 0.7s ease-out',
              }}
            >
              🍎
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-5 w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg flex items-center justify-center text-2xl"
              animate={{ y: [0, -12, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                transform: mounted ? `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` : undefined,
                transition: 'transform 0.8s ease-out',
              }}
            >
              🥕
            </motion.div>
            <motion.div
              className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center text-xl"
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                transform: mounted ? `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` : undefined,
                transition: 'transform 0.9s ease-out',
              }}
            >
              🥝
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-5 w-10 h-10 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-xl shadow-lg flex items-center justify-center text-lg"
              animate={{ y: [0, -6, 0], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                transform: mounted ? `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)` : undefined,
                transition: 'transform 0.75s ease-out',
              }}
            >
              🍓
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <a
          href="#products"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-sky-500 transition-colors group"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 group-hover:text-sky-500 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
