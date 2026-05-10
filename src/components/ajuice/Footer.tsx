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
      <div className="h-28 bg-gradient-to-b from-transparent to-gray-900 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      </div>

      {/* Dark gradient */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white relative">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-sky-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/2 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-500/15">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-white">Ajuice</span>
                  <span className="text-xs text-gray-500 block">Frozen &amp; Fresh</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mt-5">
                Ajuice Frozen &amp; Fresh menyediakan jus buah dan sayuran segar
                berkualitas premium untuk menemani gaya hidup sehat Anda setiap
                hari. Nikmati kesegaran alami dalam setiap tegukan.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-7">
                <a
                  href="https://wa.me/6285520913524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/15 flex items-center justify-center text-gray-500 hover:text-emerald-400 transition-all duration-400 border border-white/5 hover:border-emerald-400/20 hover:scale-110"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-500/15 flex items-center justify-center text-gray-500 hover:text-pink-400 transition-all duration-400 border border-white/5 hover:border-pink-400/20 hover:scale-110"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">
                Navigasi
              </h3>
              <ul className="space-y-3.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-sky-400 transition-colors text-sm group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-sky-400 transition-all duration-400" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">
                Kategori
              </h3>
              <ul className="space-y-3.5">
                {['Juice Fruit', 'Juice Vegetable', 'Jerigen Premium', 'Paket Diet'].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#products"
                      className="text-gray-400 hover:text-sky-400 transition-colors text-sm group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-sky-400 transition-all duration-400" />
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">
                Kontak
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-400" />
                  <span className="text-gray-400 text-sm">Jl Hj Alpi No 116/80</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-400" />
                  <a
                    href="tel:+6285520913524"
                    className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    +62 855-2091-3524
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-400" />
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
          <div className="mt-16 pt-8 border-t border-gray-800/40">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2026 Ajuice Frozen &amp; Fresh. All rights reserved.
              </p>
              <motion.p
                className="text-gray-600 text-xs tracking-wider"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Fresh Healthy Juice Everyday
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
