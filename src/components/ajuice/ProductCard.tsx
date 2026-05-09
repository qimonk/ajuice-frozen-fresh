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
  category: string;
  index: number;
}

export default function ProductCard({
  name,
  image,
  description,
  prices,
  gradient,
  category,
  index,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });

  // Dynamic shadow position
  const shadowX = useSpring(useTransform(x, [-150, 150], [15, -15]), {
    stiffness: 200,
    damping: 30,
  });
  const shadowY = useSpring(useTransform(y, [-150, 150], [15, -15]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const waMessage = encodeURIComponent(
    `Halo Ajuice! Saya ingin order ${name}. Bisa info lebih lanjut?`
  );

  const categoryLabel = category === 'fruit' ? 'Fruit' : 'Vegetable';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1500"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="preserve-3d relative rounded-3xl overflow-hidden group cursor-pointer"
      >
        {/* Glassmorphism card background */}
        <div className="absolute inset-0 glass-card rounded-3xl" />

        {/* Reflective shine effect on hover */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-3xl overflow-hidden"
          style={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute w-[150%] h-[200%] -top-[50%] -left-[25%] animate-shimmer-sweep"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)',
            }}
          />
        </motion.div>

        {/* Gradient background accent */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 rounded-3xl`}
        />

        {/* Image container */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-gradient-to-b from-gray-50/80 to-white/50 rounded-t-3xl">
          <motion.div
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Category badge */}
          <div className="absolute top-3 right-3 z-10">
            <div
              className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold shadow-lg`}
            >
              {categoryLabel}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 space-y-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-700 transition-colors duration-300">
            {name}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="space-y-1.5">
            {prices.map((p, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{p.label}</span>
                <span className="font-semibold text-sky-600">{p.price}</span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <a
            href={`https://wa.me/6285520913524?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative block w-full mt-2 py-3 text-center text-sm font-bold text-white rounded-xl bg-gradient-to-r ${gradient} hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group/btn`}
          >
            <span className="relative z-10">Beli Sekarang</span>
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={
                isHovered
                  ? { boxShadow: '0 8px 30px rgba(14, 165, 233, 0.3)' }
                  : { boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }
              }
              transition={{ duration: 0.3 }}
            />
          </a>
        </div>

        {/* Dynamic shadow that follows mouse */}
        <motion.div
          className="absolute -inset-1 rounded-3xl pointer-events-none z-[-1]"
          style={{
            boxShadow: isHovered
              ? '25px 25px 50px -12px rgba(14, 165, 233, 0.15), 0 0 0 1px rgba(255,255,255,0.3)'
              : '10px 10px 30px -10px rgba(0, 0, 0, 0.08)',
            translateX: shadowX,
            translateY: shadowY,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
