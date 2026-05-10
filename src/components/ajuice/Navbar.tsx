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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'glass-nav border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-200/30 group-hover:shadow-sky-300/50 transition-all duration-400 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text leading-tight tracking-tight transition-all duration-300">
                Ajuice
              </span>
              <span className="text-[10px] text-gray-400 leading-tight hidden sm:block tracking-wide">
                Frozen & Fresh
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-sky-600 rounded-lg hover:bg-sky-50/60 transition-all duration-300 group"
              >
                {link.label}
                {/* Animated underline on hover */}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full group-hover:w-4/5 transition-all duration-400" />
              </a>
            ))}
            <a
              href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-sky-300/40 hover:-translate-y-0.5 transition-all duration-500"
            >
              Order Sekarang
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100/80 transition-colors backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={22} className="text-gray-700" />
            ) : (
              <Menu size={22} className="text-gray-700" />
            )}
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
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="mx-4 mb-4 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-black/5">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -25, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-gray-600 hover:text-sky-600 hover:bg-sky-50/60 rounded-xl transition-colors font-medium"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <a
                    href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20jus."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-3 px-5 py-3.5 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                  >
                    Order Sekarang
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
