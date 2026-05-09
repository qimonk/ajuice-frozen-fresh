'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = [
  { href: '#home', label: 'Beranda' },
  { href: '#products', label: 'Menu' },
  { href: '#benefits', label: 'Keunggulan' },
  { href: '#testimonials', label: 'Testimoni' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400" />

      {/* Decorative bg elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Ajuice</span>
                <span className="text-xs text-gray-400 block">Frozen & Fresh</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Ajuice Frozen & Fresh menyediakan jus buah dan sayuran segar berkualitas premium untuk menemani gaya hidup sehat Anda setiap hari.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Kategori
            </h3>
            <ul className="space-y-3">
              {['Juice Fruit', 'Juice Vegetable'].map((cat) => (
                <li key={cat}>
                  <a
                    href="#products"
                    className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Jl Hj Alpi No 116/80</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <a
                  href="tel:+6285520913524"
                  className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  +62 855-2091-3524
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/6285520913524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Ajuice Frozen & Fresh. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Fresh Healthy Juice Everyday
          </p>
        </div>
      </div>
    </footer>
  );
}
