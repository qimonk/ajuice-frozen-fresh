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

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  // GSAP ScrollTrigger for section header
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-header',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
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
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  // Desktop: get which set of 3 to show
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
      className="py-20 sm:py-28 relative overflow-hidden section-gradient-white"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      {/* Decorative blur */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl animate-blob-1" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-rose-50/30 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-violet-50/20 rounded-full blur-3xl animate-blob-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="testimonial-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-semibold mb-4 border border-sky-100/50">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Apa Kata <span className="gradient-text">Pelanggan</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut testimoni
            dari para pelanggan setia Ajuice.
          </p>
        </div>

        {/* Desktop: 3 cards with active highlight */}
        <div
          className="testimonial-cards hidden md:grid md:grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {getDesktopCards().map((t, i) => (
            <motion.div
              key={t.id + '-' + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`testimonial-card glass-card rounded-2xl p-6 transition-all duration-700 relative overflow-hidden ${
                i === 0
                  ? 'ring-2 ring-sky-400/60 shadow-xl shadow-sky-100/50 scale-[1.02]'
                  : 'hover:shadow-lg hover:scale-[1.01]'
              }`}
            >
              {/* Active indicator gradient */}
              {i === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />
              )}

              {/* Quote icon with subtle animation */}
              <div className="mb-4 relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Quote className="w-8 h-8 text-sky-300/60" />
                </motion.div>
              </div>

              {/* Star rating with gradient */}
              <div className="flex gap-1 mb-3">
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

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
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
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Quote className="w-8 h-8 text-sky-300/60 mb-4" />
              </motion.div>
              <div className="flex gap-1 mb-3">
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
              <p className="text-gray-600 leading-relaxed mb-4">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
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
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-white flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all duration-300 border border-gray-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? 'bg-gradient-to-r from-sky-400 to-cyan-400 w-8'
                    : 'bg-gray-200 hover:bg-gray-300 w-2.5'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-white flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all duration-300 border border-gray-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
