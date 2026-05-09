'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'fruit', label: 'Juice Fruit' },
  { id: 'vegetable', label: 'Juice Vegetable' },
] as const;

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 sm:py-28 section-gradient-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
            Menu Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Pilihan <span className="gradient-text">Jus Segar</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Temukan berbagai varian jus buah dan sayuran segar pilihan dengan kualitas premium untuk menemani hari-hari sehat Anda.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-300/30'
                  : 'bg-white text-gray-600 hover:bg-sky-50 hover:text-sky-600 border border-gray-200 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              prices={product.prices}
              gradient={product.gradient}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">
            Tertarik order dalam jumlah besar?
          </p>
          <a
            href="https://wa.me/6285520913524?text=Halo%20Ajuice!%20Saya%20ingin%20order%20dalam%20jumlah%20besar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold rounded-full hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-xl hover:shadow-sky-300/40"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
