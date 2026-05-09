'use client';

import { Leaf, ShieldCheck, Sparkles, Heart, Zap, TrendingDown, type LucideIcon } from 'lucide-react';
import { benefits } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  ShieldCheck,
  Sparkles,
  Heart,
  Zap,
  TrendingDown,
};

export default function BenefitSection() {
  return (
    <section id="benefits" className="py-20 sm:py-28 section-gradient-blue relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 text-sky-600 text-sm font-semibold mb-4 border border-sky-100">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Mengapa Pilih <span className="gradient-text">Ajuice</span>?
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Kami berkomitmen memberikan jus segar berkualitas tinggi dengan standar keamanan dan kesegaran terbaik untuk kesehatan Anda.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const IconComp = iconMap[benefit.icon] || Leaf;
            return (
              <div
                key={benefit.id}
                className="group glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mb-5 shadow-lg group-hover:shadow-sky-300/40 transition-shadow">
                  <IconComp className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-700 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
