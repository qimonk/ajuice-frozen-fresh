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

  // GSAP ScrollTrigger for section header
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.product-category-bar',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-category-bar',
            start: 'top 85%',
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
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      {/* Subtle animated gradient background */}
      <div
        className="absolute inset-0 animate-mesh-alt"
        style={{
          background:
            'linear-gradient(180deg, #ffffff 0%, #f8fafc 20%, #fefce8 40%, #f8fafc 60%, #ffffff 80%, #f0f9ff 100%)',
          backgroundSize: '300% 300%',
        }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="product-header text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-semibold mb-4 border border-sky-100/50">
            Menu Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Pilihan{' '}
            <span className="gradient-text">Jus Segar</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Temukan berbagai varian jus buah dan sayuran segar pilihan dengan
            kualitas premium untuk menemani hari-hari sehat Anda.
          </p>
          {/* Animated underline */}
          <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 rounded-full opacity-60" />
        </div>

        {/* Category filter */}
        <div className="product-category-bar flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-300/30'
                  : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-sky-50 hover:text-sky-600 border border-gray-200/60 shadow-sm'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="category-glow"
                  className="absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Products grid with AnimatePresence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
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
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Tertarik order dalam jumlah besar?</p>
          <a
            href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20dalam%20jumlah%20besar."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold rounded-full shadow-xl shadow-sky-300/30 hover:shadow-sky-400/50 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Hubungi Kami via WhatsApp</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
