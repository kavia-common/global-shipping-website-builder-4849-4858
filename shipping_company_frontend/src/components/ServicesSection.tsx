'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Truck, Ship, Package, Clock, Globe, Shield, Zap } from 'lucide-react';

interface Service {
  icon: React.ComponentType<{size?: number; className?: string}>;
  title: string;
  description: string;
  features: string[];
  deliveryTime: string;
  price: string;
  popular?: boolean;
}

// PUBLIC_INTERFACE
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.service-card',
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              duration: 800,
              delay: anime.stagger(150),
              easing: 'easeOutQuart'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services: Service[] = [
    {
      icon: Zap,
      title: 'Express Shipping',
      description: 'Ultra-fast delivery for urgent shipments worldwide',
      features: ['1-2 day delivery', 'Priority handling', 'Real-time tracking', 'Insurance included'],
      deliveryTime: '1-2 Days',
      price: 'From $25',
      popular: true
    },
    {
      icon: Truck,
      title: 'Standard Shipping',
      description: 'Reliable and cost-effective shipping solution',
      features: ['3-7 day delivery', 'Tracking included', 'Secure packaging', 'Affordable rates'],
      deliveryTime: '3-7 Days',
      price: 'From $8'
    },
    {
      icon: Ship,
      title: 'International Freight',
      description: 'Complete freight solutions for global commerce',
      features: ['Ocean & air freight', 'Customs clearance', 'Door-to-door service', 'Bulk discounts'],
      deliveryTime: '7-21 Days',
      price: 'Custom Quote'
    },
    {
      icon: Package,
      title: 'Warehousing & Logistics',
      description: 'Comprehensive storage and distribution services',
      features: ['Secure storage', 'Inventory management', 'Order fulfillment', '24/7 monitoring'],
      deliveryTime: 'On Demand',
      price: 'Custom Quote'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-ocean mb-6">
            Our Shipping Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of shipping solutions designed to meet 
            your specific needs, from express delivery to freight logistics.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className={`service-card relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border ${
                service.popular ? 'border-secondary border-2' : 'border-gray-200'
              }`}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    service.popular ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                  }`}
                >
                  <service.icon size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-blue-ocean mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Delivery Time:</span>
                  <span className="text-sm font-bold text-primary">{service.deliveryTime}</span>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-blue-ocean">
                      {service.price}
                    </span>
                    <span className="text-sm text-gray-500">Starting price</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      service.popular
                        ? 'bg-secondary text-white hover:bg-orange-500'
                        : 'bg-primary text-white hover:bg-blue-ocean'
                    }`}
                  >
                    Get Quote
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="text-lg font-bold text-blue-ocean mb-2">Global Reach</h4>
            <p className="text-gray-600">Delivering to 195+ countries worldwide</p>
          </div>
          <div className="text-center p-6">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="text-lg font-bold text-blue-ocean mb-2">Secure & Insured</h4>
            <p className="text-gray-600">Full insurance coverage on all shipments</p>
          </div>
          <div className="text-center p-6">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="text-lg font-bold text-blue-ocean mb-2">24/7 Support</h4>
            <p className="text-gray-600">Round-the-clock customer assistance</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
