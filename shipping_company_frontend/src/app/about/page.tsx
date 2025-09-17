'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import { Users, Globe, Award, Shield, Target, Heart, Truck, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{size?: number; className?: string}>;
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  avatar: string;
}

// PUBLIC_INTERFACE
export default function AboutPage() {
  useEffect(() => {
    // Animate timeline items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.timeline-item',
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

    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
      observer.observe(timelineSection);
    }

    return () => observer.disconnect();
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1995',
      title: 'Company Founded',
      description: 'OceanShip Global started as a small shipping company in New York with a vision to connect the world.',
      icon: Package
    },
    {
      year: '2000',
      title: 'International Expansion',
      description: 'Extended operations to Europe and Asia, establishing our first international partnerships.',
      icon: Globe
    },
    {
      year: '2005',
      title: 'Technology Innovation',
      description: 'Launched our real-time tracking system, revolutionizing customer experience in shipping.',
      icon: Target
    },
    {
      year: '2010',
      title: 'Fleet Modernization',
      description: 'Invested in eco-friendly transportation and expanded our logistics capabilities.',
      icon: Truck
    },
    {
      year: '2015',
      title: 'Industry Recognition',
      description: 'Received multiple awards for excellence in logistics and customer service.',
      icon: Award
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented AI-powered logistics optimization and enhanced digital customer portals.',
      icon: Shield
    },
    {
      year: '2024',
      title: 'Global Leadership',
      description: 'Serving 195+ countries with over 1 million packages delivered monthly.',
      icon: Users
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      bio: 'With over 25 years in logistics, Sarah leads OceanShip\'s vision for global connectivity.',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      position: 'CTO',
      bio: 'Technology innovator driving our digital transformation and tracking solutions.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      position: 'COO',
      bio: 'Operations expert ensuring smooth delivery processes across all regions.',
      avatar: 'ER'
    },
    {
      name: 'David Thompson',
      position: 'VP International',
      bio: 'Leading our global expansion and international partnership development.',
      avatar: 'DT'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make prioritizes our customers\' needs and satisfaction.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We handle every package with the utmost care and security protocols.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting people and businesses across all continents and cultures.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for perfection in every aspect of our shipping services.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-ocean">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-blue-ocean mb-6"
            >
              About OceanShip Global
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              For nearly three decades, we&apos;ve been connecting the world through reliable, 
              secure, and innovative shipping solutions. Our story is one of growth, 
              innovation, and unwavering commitment to our customers.
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-blue-ocean mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To provide world-class shipping and logistics solutions that connect 
                  businesses and individuals globally, while maintaining the highest 
                  standards of reliability, security, and customer service.
                </p>
                <h3 className="text-2xl font-bold text-blue-ocean mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600">
                  To be the world&apos;s most trusted shipping partner, pioneering 
                  innovative solutions that make global commerce seamless, sustainable, 
                  and accessible to all.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-gradient-ocean rounded-xl"
                  >
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-bold text-blue-ocean mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 bg-gray-50 timeline-section">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-blue-ocean mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to global leadership, discover the key milestones 
                that shaped OceanShip into the trusted shipping partner it is today.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary" />
                <div className="space-y-12">
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={event.year}
                      className="timeline-item relative flex items-start space-x-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full">
                        <event.icon size={24} />
                      </div>
                      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-blue-ocean">{event.title}</h3>
                          <span className="text-lg font-bold text-secondary">{event.year}</span>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-blue-ocean mb-6">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the experienced professionals who guide OceanShip&apos;s strategic 
                direction and operational excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-blue-ocean mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-16 bg-gradient-ocean">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-ocean mb-6">Global Presence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With operations spanning six continents, we&apos;re truly a global shipping partner.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl"
              >
                <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-blue-ocean mb-2">195+</h3>
                <p className="text-lg text-gray-600">Countries Served</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl"
              >
                <Package className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-blue-ocean mb-2">50+</h3>
                <p className="text-lg text-gray-600">Distribution Centers</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl"
              >
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-blue-ocean mb-2">10,000+</h3>
                <p className="text-lg text-gray-600">Team Members</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
