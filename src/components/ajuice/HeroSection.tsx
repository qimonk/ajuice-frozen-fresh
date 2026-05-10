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
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP parallax scroll effects - multi-layer depth
  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Text parallax - slow
      gsap.to(textRef.current, {
        yPercent: -20,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Hero image parallax - fast
      gsap.to(imageRef.current, {
        yPercent: -35,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Blur layer 1 - fastest (furthest)
      gsap.to('.hero-blur-1', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Blur layer 2
      gsap.to('.hero-blur-2', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Blur layer 3 - slowest (closest)
      gsap.to('.hero-blur-3', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Decorative fruits parallax
      gsap.to('.hero-deco-1', {
        yPercent: -40,
        rotation: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to('.hero-deco-2', {
        yPercent: -30,
        rotation: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      gsap.to('.hero-deco-3', {
        yPercent: -45,
        rotation: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to('.hero-deco-4', {
        yPercent: -20,
        rotation: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth mouse tracking with lerp
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      smoothMouse.current.x += (mousePos.current.x - smoothMouse.current.x) * 0.06;
      smoothMouse.current.y += (mousePos.current.y - smoothMouse.current.y) * 0.06;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const mx = mounted ? smoothMouse.current.x : 0;
  const my = mounted ? smoothMouse.current.y : 0;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Multi-layer mesh gradient background */}
      <div
        className="absolute inset-0 animate-mesh noise-overlay"
        style={{
          background:
            'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 8%, #fef3c7 18%, #fce7f3 28%, #ede9fe 38%, #f0f9ff 48%, #d1fae5 58%, #e0f2fe 68%, #fce7f3 78%, #f0f9ff 88%, #ecfeff 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Depth blur layers - 3 layers for parallax */}
      <div className="hero-blur-1 absolute top-[-15%] left-[-10%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-sky-200/30 to-cyan-50/20 rounded-full animate-blur-pulse-1" />
      <div className="hero-blur-2 absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] bg-gradient-to-br from-rose-100/25 to-amber-50/30 rounded-full animate-blur-pulse-2" />
      <div className="hero-blur-3 absolute top-[25%] left-[35%] w-[500px] h-[500px] bg-gradient-to-br from-violet-100/20 to-emerald-50/15 rounded-full animate-blur-pulse-3" />

      {/* Liquid animated blobs */}
      <div className="absolute top-[15%] right-[15%] w-[350px] h-[350px] bg-gradient-to-br from-pink-200/15 to-sky-100/10 rounded-full animate-blob-1 opacity-70" />
      <div className="absolute bottom-[20%] left-[10%] w-[280px] h-[280px] bg-gradient-to-br from-amber-100/15 to-emerald-50/10 rounded-full animate-blob-2 opacity-60" />
      <div className="absolute top-[50%] right-[5%] w-[320px] h-[320px] bg-gradient-to-br from-cyan-100/12 to-violet-50/8 rounded-full animate-blob-3 opacity-50" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content with mouse reactive movement */}
          <div ref={textRef} className="text-center md:text-left">
            {/* Premium badge with glassmorphism + glow */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.85, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-xl text-sky-700 text-sm font-medium mb-8 border border-white/40 glow-effect-soft"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Premium Fresh Juice</span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Cinematic heading - dramatic reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60, skewY: 2, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, skewY: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text-cinematic">Fresh Healthy</span>
              </motion.span>
              <motion.span
                className="block text-gray-900 mt-1"
                initial={{ opacity: 0, y: 60, skewY: -1, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, skewY: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Juice Everyday
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg sm:text-xl text-gray-500 max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Jus buah dan sayuran segar dengan kualitas premium untuk hidup lebih sehat.
              Tanpa pengawet, 100% alami, fresh setiap hari.
            </motion.p>

            {/* CTA buttons with glow hover */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 text-white font-bold rounded-full shadow-xl shadow-sky-300/30 hover:shadow-sky-400/50 transition-all duration-500 transform hover:-translate-y-1.5 overflow-hidden"
              >
                <span className="relative z-10">Order Sekarang</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 30px rgba(255,255,255,0.15)' }} />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sky-200/60 text-sky-600 font-bold rounded-full hover:bg-sky-50/80 hover:border-sky-300/80 transition-all duration-500 backdrop-blur-sm bg-white/30"
              >
                Lihat Menu
              </a>
            </motion.div>

            {/* Stats with stagger reveal */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto md:mx-0"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center md:text-left"
                  initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
                  animate={statsVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero image - mouse reactive with cinematic glow */}
          <div ref={imageRef} className="relative flex items-center justify-center">
            {/* Multi-layered glow ring behind image */}
            <div
              className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(139,92,246,0.06) 35%, rgba(236,72,153,0.03) 55%, transparent 70%)',
                transform: `translate(${mx * 18}px, ${my * 18}px)`,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* Secondary glow */}
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 60%)',
                transform: `translate(${mx * -10}px, ${my * -10}px)`,
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* Main image with float + mouse reactive */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              style={{
                transform: `translate(${mx * 12}px, ${my * 12}px)`,
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Outer glow ring */}
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-sky-200/30 via-cyan-100/20 to-violet-100/20 animate-ring-spin" />

              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-1 ring-white/40">
                <Image
                  src="/hero-juice.png"
                  alt="Ajuice Fresh Juice Collection"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />
                {/* Cinematic shine overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }} />
              </div>
            </motion.div>

            {/* Floating fruit decorations with individual parallax */}
            <motion.div
              className="hero-deco-1 absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl shadow-lg shadow-red-200/40 flex items-center justify-center text-2xl"
              animate={{ y: [0, -12, 0], rotate: [0, 12, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                transform: `translate(${mx * -6}px, ${my * -6}px)`,
                transition: 'transform 0.8s ease-out',
              }}
            >
              🍎
            </motion.div>
            <motion.div
              className="hero-deco-2 absolute bottom-16 left-2 w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg shadow-amber-200/40 flex items-center justify-center text-2xl"
              animate={{ y: [0, -14, 0], rotate: [0, -12, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                transform: `translate(${mx * -10}px, ${my * -10}px)`,
                transition: 'transform 0.9s ease-out',
              }}
            >
              🥕
            </motion.div>
            <motion.div
              className="hero-deco-3 absolute top-16 left-6 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg shadow-green-200/40 flex items-center justify-center text-xl"
              animate={{ y: [0, -10, 0], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                transform: `translate(${mx * -12}px, ${my * -12}px)`,
                transition: 'transform 1s ease-out',
              }}
            >
              🥝
            </motion.div>
            <motion.div
              className="hero-deco-4 absolute bottom-8 right-4 w-10 h-10 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-xl shadow-lg shadow-pink-200/40 flex items-center justify-center text-lg"
              animate={{ y: [0, -8, 0], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                transform: `translate(${mx * -8}px, ${my * -8}px)`,
                transition: 'transform 0.85s ease-out',
              }}
            >
              🍓
            </motion.div>

            {/* Sparkle particles */}
            <div className="absolute top-4 left-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full animate-sparkle opacity-60" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/3 right-4 w-1 h-1 bg-sky-300 rounded-full animate-sparkle opacity-50" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-8 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-sparkle opacity-40" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-sparkle opacity-50" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/3 right-8 w-1 h-1 bg-rose-300 rounded-full animate-sparkle opacity-40" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* Cinematic scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#products"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-sky-500 transition-colors duration-300 group"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 group-hover:text-sky-500 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
