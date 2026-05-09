'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ajuice/Navbar';
import HeroSection from '@/components/ajuice/HeroSection';
import ProductSection from '@/components/ajuice/ProductSection';
import BenefitSection from '@/components/ajuice/BenefitSection';
import TestimonialSection from '@/components/ajuice/TestimonialSection';
import WhatsAppCTA from '@/components/ajuice/WhatsAppCTA';
import Footer from '@/components/ajuice/Footer';

const LoadingScreen = dynamic(() => import('@/components/ajuice/LoadingScreen'), {
  ssr: false,
});
const CursorGlow = dynamic(() => import('@/components/ajuice/CursorGlow'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <ProductSection />
        <BenefitSection />
        <TestimonialSection />
      </main>
      <Footer />
      <WhatsAppCTA />
    </>
  );
}
