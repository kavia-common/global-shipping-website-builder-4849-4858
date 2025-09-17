'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Search, ArrowRight, Truck, Globe, Shield, Clock, Package } from 'lucide-react';

// PUBLIC_INTERFACE
export default function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    // Animate floating icons
    anime({
      targets: '.floating-icon',
      translateY: [-10, 10],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(500)
    });

    // Animate statistics counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      anime({
        targets: counter,
        innerHTML: [0, target],
        duration: 2000,
        delay: 1000,
        easing: 'easeOutQuart',
        round: 1
      });
    });
  }, []);

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      window.location.href = `/tracking?number=${trackingNumber}`;
    }
  };

  const stats = [
    { icon: Package, value: 1000000, label: 'Packages Delivered', suffix: '+' },
    { icon: Globe, value: 195, label: 'Countries Served', suffix: '' },
    { icon: Truck, value: 5000, label: 'Daily Shipments', suffix: '+' },
    { icon: Clock, value: 99, label: 'On-Time Delivery', suffix: '%' }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-ocean">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-icon absolute top-20 left-10 text-primary/20">
          <Truck size={48} />
        </div>
        <div className="floating-icon absolute top-40 right-20 text-secondary/20">
          <Globe size={64} />
        </div>
        <div className="floating-icon absolute bottom-32 left-1/4 text-primary/20">
          <Shield size={40} />
        </div>
        <div className="floating-icon absolute bottom-20 right-1/3 text-secondary/20">
          <Package size={56} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-ocean leading-tight"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Global Shipping
              <span className="text-primary block">
                Solutions You Can Trust
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 max-w-lg"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience reliable, fast, and secure shipping services worldwide. 
              Track your packages in real-time and enjoy peace of mind with every delivery.
            </motion.p>

            {/* Tracking Form */}
            <motion.form 
              onSubmit={handleTrackingSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 flex items-center gap-2 font-medium"
              >
                Track Package
                <ArrowRight size={20} />
              </motion.button>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-secondary text-white rounded-lg hover:bg-orange-500 transition-all duration-200 font-medium text-lg"
              >
                Get Instant Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium text-lg"
              >
                Schedule Pickup
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-ocean">
                  <span className="counter" data-target={stat.value}>0</span>
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
