'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ajuice/Navbar';
import HeroSection from '@/components/ajuice/HeroSection';
import ProductSection from '@/components/ajuice/ProductSection';
import BenefitSection from '@/components/ajuice/BenefitSection';
import TestimonialSection from '@/components/ajuice/TestimonialSection';
import WhatsAppCTA from '@/components/ajuice/WhatsAppCTA';
import Footer from '@/components/ajuice/Footer';

const SmoothScroll = dynamic(() => import('@/components/ajuice/SmoothScroll'), {
  ssr: false,
});

const LoadingScreen = dynamic(() => import('@/components/ajuice/LoadingScreen'), {
  ssr: false,
});

const CursorGlow = dynamic(() => import('@/components/ajuice/CursorGlow'), {
  ssr: false,
});

const FloatingFruits3D = dynamic(
  () => import('@/components/ajuice/FloatingFruits3D'),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        {/* Cinematic hero with integrated 3D floating fruits */}
        <section className="relative">
          <HeroSection />
          {/* 3D fruits overlay on hero (desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-[5]">
            <FloatingFruits3D />
          </div>
        </section>

        {/* Cinematic divider between hero and products */}
        <div className="cinema-divider" />

        <ProductSection />

        <BenefitSection />

        <TestimonialSection />
      </main>
      <Footer />
      <WhatsAppCTA />
    </SmoothScroll>
  );
}
