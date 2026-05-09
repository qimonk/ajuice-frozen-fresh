'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';

const footerLinks = [
  { href: '#home', label: 'Beranda' },
  { href: '#products', label: 'Menu' },
  { href: '#benefits', label: 'Keunggulan' },
  { href: '#testimonials', label: 'Testimoni' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Glassmorphism top edge */}
      <div className="h-24 bg-gradient-to-b from-transparent to-gray-900 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400/0 via-sky-400/40 to-sky-400/0" />
      </div>

      {/* Dark gradient background */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white relative">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-white">Ajuice</span>
                  <span className="text-xs text-gray-400 block">Frozen &amp; Fresh</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mt-4">
                Ajuice Frozen &amp; Fresh menyediakan jus buah dan sayuran segar
                berkualitas premium untuk menemani gaya hidup sehat Anda setiap
                hari.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://wa.me/6285520913524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500/20 flex items-center justify-center text-gray-400 hover:text-sky-400 transition-all duration-300 border border-white/5 hover:border-sky-400/20"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-500/20 flex items-center justify-center text-gray-400 hover:text-pink-400 transition-all duration-300 border border-white/5 hover:border-pink-400/20"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
                Navigasi
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-sky-400 transition-colors text-sm group flex items-center gap-1"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-sky-400 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
                Kategori
              </h3>
              <ul className="space-y-3">
                {['Juice Fruit', 'Juice Vegetable'].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#products"
                      className="text-gray-400 hover:text-sky-400 transition-colors text-sm group flex items-center gap-1"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-sky-400 transition-all duration-300" />
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
                Kontak
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 text-sm">Jl Hj Alpi No 116/80</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <a
                    href="tel:+6285520913524"
                    className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    +62 855-2091-3524
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <a
                    href="https://wa.me/6285520913524"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-8 border-t border-gray-800/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2026 Ajuice Frozen &amp; Fresh. All rights reserved.
              </p>
              <motion.p
                className="text-gray-600 text-xs tracking-wider"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✦ Fresh Healthy Juice Everyday ✦
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
