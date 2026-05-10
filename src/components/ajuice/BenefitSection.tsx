'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sparkles, Heart, Zap, TrendingDown, type LucideIcon } from 'lucide-react';
import { benefits } from '@/lib/data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  ShieldCheck,
  Sparkles,
  Heart,
  Zap,
  TrendingDown,
};

export default function BenefitSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.benefit-header',
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.benefit-header',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger reveal cards
      gsap.fromTo(
        '.benefit-card',
        { opacity: 0, y: 60, scale: 0.92, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.benefit-cards-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Cinematic animated gradient */}
      <div
        className="absolute inset-0 animate-mesh"
        style={{
          background:
            'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 15%, #ede9fe 30%, #f0f9ff 50%, #d1fae5 70%, #fce7f3 85%, #f0f9ff 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating decorative orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl animate-blob-1" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-200/15 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/10 rounded-full blur-3xl animate-blob-3" />

      {/* Cinematic divider */}
      <div className="cinema-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="benefit-header text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sky-600 text-sm font-semibold mb-5 border border-sky-100/40">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Mengapa Pilih <span className="gradient-text">Ajuice</span>?
          </h2>
          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Kami berkomitmen memberikan jus segar berkualitas tinggi dengan
            standar keamanan dan kesegaran terbaik untuk kesehatan Anda.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="benefit-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {benefits.map((benefit, i) => {
            const IconComp = iconMap[benefit.icon] || Leaf;
            return (
              <div
                key={benefit.id}
                className="benefit-card glass-card rounded-2xl p-7 sm:p-8 group cursor-pointer transition-all duration-600 hover:-translate-y-2.5 relative overflow-hidden"
              >
                {/* Gradient fill on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 via-cyan-50/0 to-violet-50/0 group-hover:from-sky-50/40 group-hover:via-cyan-50/20 group-hover:to-violet-50/10 transition-all duration-700 rounded-2xl" />

                {/* Icon with glow ring */}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-sky-200/40 group-hover:shadow-sky-300/60 group-hover:scale-110 transition-all duration-500">
                  <IconComp className="w-7 h-7 text-white" />
                  {/* Animated glow ring */}
                  <div className="absolute inset-[-3px] rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
                </div>

                <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-700 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="relative text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Cinematic corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-100/0 to-transparent group-hover:from-sky-100/30 rounded-bl-3xl transition-all duration-700" />

                {/* Bottom shine line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-sky-200/0 to-transparent group-hover:via-sky-200/40 transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
