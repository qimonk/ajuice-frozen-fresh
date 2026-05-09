'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Beranda' },
  { href: '#products', label: 'Menu' },
  { href: '#benefits', label: 'Keunggulan' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#contact', label: 'Kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-blur' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg group-hover:shadow-sky-300/50 transition-shadow">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sky-600 leading-tight tracking-tight">
                Ajuice
              </span>
              <span className="text-[10px] text-gray-400 leading-tight hidden sm:block">
                Frozen & Fresh
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-full hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-sky-300/40"
            >
              Order Sekarang
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-3 px-5 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-full hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg"
              >
                Order Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
