'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-header',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 40, scale: 0.95, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-cards',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.93,
      filter: 'blur(4px)',
    }),
    center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (dir: number) => ({
      x: dir > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.93,
      filter: 'blur(4px)',
    }),
  };

  const getDesktopCards = () => {
    const start = current;
    return [
      testimonials[start],
      testimonials[(start + 1) % testimonials.length],
      testimonials[(start + 2) % testimonials.length],
    ];
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 section-gradient-white" />
      <div className="cinema-divider" />

      {/* Decorative blurs */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-sky-50/30 rounded-full blur-3xl animate-blob-1" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-rose-50/25 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-violet-50/15 rounded-full blur-3xl animate-blob-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="testimonial-header text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-sky-50/80 text-sky-600 text-sm font-semibold mb-5 border border-sky-100/40 backdrop-blur-sm">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Apa Kata <span className="gradient-text">Pelanggan</span>
          </h2>
          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut testimoni
            dari para pelanggan setia Ajuice.
          </p>
        </div>

        {/* Desktop: 3 cards with cinematic active highlight */}
        <div
          className="testimonial-cards hidden md:grid md:grid-cols-3 gap-7"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {getDesktopCards().map((t, i) => (
            <motion.div
              key={t.id + '-' + i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`testimonial-card glass-card rounded-2xl p-7 transition-all duration-700 relative overflow-hidden ${
                i === 0
                  ? 'ring-2 ring-sky-300/60 shadow-xl shadow-sky-100/40 scale-[1.03]'
                  : 'hover:shadow-lg hover:scale-[1.01]'
              }`}
            >
              {/* Active indicator gradient bar */}
              {i === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-t-2xl" />
              )}

              {/* Animated quote icon */}
              <div className="mb-5 relative">
                <motion.div
                  animate={{ rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Quote className="w-8 h-8 text-sky-200/80" />
                </motion.div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${
                      si < t.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-gray-100/60">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-sky-200/30">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-7 relative overflow-hidden"
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-t-2xl" />
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Quote className="w-8 h-8 text-sky-200/80 mb-5" />
              </motion.div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${
                      si < testimonials[current].rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-5">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100/60">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {testimonials[current].product}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-5 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-white hover:scale-105 flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all duration-300 border border-gray-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? 'bg-gradient-to-r from-sky-400 to-cyan-400 w-9 shadow-sm shadow-sky-200/40'
                    : 'bg-gray-200/60 hover:bg-gray-300 w-2.5'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-white hover:scale-105 flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all duration-300 border border-gray-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
