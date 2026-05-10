'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'fruit', label: 'Juice Fruit' },
  { id: 'vegetable', label: 'Juice Vegetable' },
] as const;

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.product-header',
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Category bar
      gsap.fromTo(
        '.product-category-bar',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-category-bar',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Animated mesh background */}
      <div
        className="absolute inset-0 animate-mesh-alt"
        style={{
          background:
            'linear-gradient(180deg, #ffffff 0%, #f8fafc 15%, #fefce8 30%, #f0f9ff 50%, #fdf2f8 70%, #ffffff 85%, #f0f9ff 100%)',
          backgroundSize: '300% 300%',
        }}
      />

      {/* Top cinematic divider */}
      <div className="cinema-divider" />

      {/* Decorative blur orbs */}
      <div className="absolute top-20 left-[-5%] w-72 h-72 bg-sky-100/20 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute bottom-20 right-[-5%] w-80 h-80 bg-violet-50/15 rounded-full blur-3xl animate-blob-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="product-header text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 rounded-full bg-sky-50/80 text-sky-600 text-sm font-semibold mb-5 border border-sky-100/40 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Menu Kami
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Pilihan{' '}
            <span className="gradient-text">Jus Segar</span>
          </h2>
          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Temukan berbagai varian jus buah dan sayuran segar pilihan dengan
            kualitas premium untuk menemani hari-hari sehat Anda.
          </p>
          {/* Animated gradient underline */}
          <div className="mt-5 mx-auto w-28 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-full opacity-50" />
        </div>

        {/* Category filter with glow */}
        <div className="product-category-bar flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-300/30'
                  : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-sky-50/80 hover:text-sky-600 border border-gray-200/50 shadow-sm'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="category-glow"
                  className="absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    boxShadow: '0 0 25px rgba(14, 165, 233, 0.3), 0 0 50px rgba(14, 165, 233, 0.1)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Products grid with cinematic filter transition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={`${activeCategory}-${product.id}`}
                name={product.name}
                image={product.image}
                description={product.description}
                prices={product.prices}
                gradient={product.gradient}
                category={product.category}
                index={index}
                productId={product.id}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-20"
        >
          <p className="text-gray-500 mb-5 text-lg">Tertarik order dalam jumlah besar?</p>
          <a
            href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20dalam%20jumlah%20besar."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold rounded-full shadow-xl shadow-sky-300/30 hover:shadow-sky-400/50 transition-all duration-500 transform hover:-translate-y-1.5 overflow-hidden"
          >
            <span className="relative z-10">Hubungi Kami via WhatsApp</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
