'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Star, Quote, Users, Award, Globe, Shield } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

// PUBLIC_INTERFACE
export default function TrustIndicators() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate statistics
            anime({
              targets: '.stat-number',
              innerHTML: function(el) {
                return [0, parseInt(el.getAttribute('data-value') || '0')];
              },
              duration: 2000,
              easing: 'easeOutQuart',
              round: 1
            });

            // Animate testimonial cards
            anime({
              targets: '.testimonial-card',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: anime.stagger(200),
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

  const statistics = [
    {
      icon: Users,
      value: 500000,
      suffix: '+',
      label: 'Happy Customers',
      description: 'Trusted by businesses worldwide'
    },
    {
      icon: Globe,
      value: 195,
      suffix: '',
      label: 'Countries Served',
      description: 'Global shipping network'
    },
    {
      icon: Award,
      value: 99.9,
      suffix: '%',
      label: 'Delivery Success',
      description: 'On-time delivery rate'
    },
    {
      icon: Shield,
      value: 24,
      suffix: '/7',
      label: 'Support Available',
      description: 'Round-the-clock assistance'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      content: 'OceanShip has transformed our international shipping. Fast, reliable, and excellent customer service. Highly recommended!',
      rating: 5,
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Global Exports Ltd.',
      content: 'The real-time tracking and professional handling of our freight shipments is outstanding. Great value for money.',
      rating: 5,
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      company: 'Fashion Forward',
      content: 'Their express shipping service saved our product launch. Fast delivery and packages arrived in perfect condition.',
      rating: 5,
      avatar: 'ER'
    }
  ];

  const certifications = [
    { name: 'ISO 9001', description: 'Quality Management' },
    { name: 'ISO 14001', description: 'Environmental Management' },
    { name: 'IATA', description: 'Air Transport Association' },
    { name: 'C-TPAT', description: 'Customs Security' }
  ];

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
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the growing number of businesses that trust OceanShip for their 
            shipping and logistics needs. Our commitment to excellence speaks for itself.
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-ocean rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4"
              >
                <stat.icon size={32} />
              </motion.div>
              <div className="text-4xl font-bold text-blue-ocean mb-2">
                <span className="stat-number" data-value={stat.value}>0</span>
                {stat.suffix}
              </div>
              <h3 className="text-lg font-semibold text-blue-ocean mb-1">
                {stat.label}
              </h3>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-blue-ocean mb-4">
              What Our Customers Say
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from real customers who trust us with their shipping needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="testimonial-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                <Quote className="absolute top-4 right-4 text-primary/20" size={24} />
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-ocean">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-secondary fill-current" size={16} />
                  ))}
                </div>

                <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-blue-ocean mb-8">
            Certified & Compliant
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-all duration-200"
              >
                <div className="font-bold text-blue-ocean mb-1">{cert.name}</div>
                <div className="text-gray-600 text-sm">{cert.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
