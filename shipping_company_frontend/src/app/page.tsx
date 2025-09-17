'use client';

import { useEffect } from 'react';
import anime from 'animejs';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrackingDashboard from '@/components/TrackingDashboard';
import TrustIndicators from '@/components/TrustIndicators';
import ShippingCalculator from '@/components/ShippingCalculator';
import Footer from '@/components/Footer';

// PUBLIC_INTERFACE
export default function Home() {
  useEffect(() => {
    // Initialize page animations
    anime({
      targets: '.animate-on-load',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutQuart'
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TrackingDashboard />
        <TrustIndicators />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-ocean mb-6">Quick Rate Calculator</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get instant shipping estimates for your packages with our easy-to-use calculator.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ShippingCalculator />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
