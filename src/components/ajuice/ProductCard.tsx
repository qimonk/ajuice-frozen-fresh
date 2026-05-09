'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  prices: { label: string; price: string }[];
  gradient: string;
  index: number;
}

export default function ProductCard({ name, image, description, prices, gradient, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const waMessage = encodeURIComponent(`Halo Ajuice! Saya ingin order ${name}. Bisa info lebih lanjut?`);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="preserve-3d relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500 group"
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500`} />

        {/* Image container */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          <motion.div
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <Image
              src={image}
              alt={`Jus ${name} - Ajuice Frozen & Fresh`}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </motion.div>

          {/* Floating badge */}
          <div className="absolute top-3 right-3">
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold shadow-lg`}>
              Fresh
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 relative z-10">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Prices */}
          <div className="space-y-1.5">
            {prices.map((p, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{p.label}</span>
                <span className="font-semibold text-sky-600">{p.price}</span>
              </div>
            ))}
          </div>

          {/* Buy button */}
          <a
            href={`https://wa.me/6285520913524?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full mt-2 py-3 text-center text-sm font-bold text-white rounded-xl bg-gradient-to-r ${gradient} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0`}
          >
            Beli Sekarang
          </a>
        </div>

        {/* Dynamic shadow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={isHovered
            ? { boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.2)' }
            : { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }
          }
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
