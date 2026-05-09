'use client';

import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BenefitSection() {
  return (
    <section id="benefits" className="py-20 sm:py-28 section-gradient-blue relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 text-sky-600 text-sm font-semibold mb-4 border border-sky-100">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Mengapa Pilih <span className="gradient-text">Ajuice</span>?
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Kami berkomitmen memberikan jus segar berkualitas tinggi dengan standar keamanan dan kesegaran terbaik untuk kesehatan Anda.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit) => {
            const IconComp = iconMap[benefit.icon] || Leaf;
            return (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                className="group glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mb-5 shadow-lg group-hover:shadow-sky-300/40 transition-shadow">
                  <IconComp className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-700 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
