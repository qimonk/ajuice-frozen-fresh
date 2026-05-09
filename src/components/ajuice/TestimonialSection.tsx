'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 section-gradient-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-sky-100/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Apa Kata <span className="gradient-text">Pelanggan</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut testimoni dari para pelanggan setia Ajuice.
          </p>
        </div>

        {/* Testimonials grid - desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={t.id}
              className={`glass-card rounded-2xl p-6 transition-all duration-500 ${
                i === current % 3 ? 'ring-2 ring-sky-400 shadow-xl scale-[1.02]' : 'hover:shadow-lg'
              }`}
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-sky-300" />
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < t.rating ? 'star-filled fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.product}</p>
                </div>
              </div>
            </div>
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
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="glass-card rounded-2xl p-6"
            >
              <Quote className="w-8 h-8 text-sky-300 mb-4" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < testimonials[current].rating ? 'star-filled fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                &quot;{testimonials[current].text}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</p>
                  <p className="text-xs text-gray-400">{testimonials[current].product}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all"
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
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-sky-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
