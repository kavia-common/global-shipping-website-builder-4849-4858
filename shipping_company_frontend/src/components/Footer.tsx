'use client';

import { motion } from 'framer-motion';
import { Package, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

// PUBLIC_INTERFACE
export default function Footer() {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Express Shipping', href: '/services/express' },
        { name: 'Standard Shipping', href: '/services/standard' },
        { name: 'International Freight', href: '/services/freight' },
        { name: 'Warehousing', href: '/services/warehousing' },
        { name: 'Logistics Solutions', href: '/services/logistics' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Track Package', href: '/tracking' },
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Calculator', href: '/calculator' },
        { name: 'File a Claim', href: '/claims' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'News & Media', href: '/news' },
        { name: 'Investor Relations', href: '/investors' },
        { name: 'Sustainability', href: '/sustainability' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Shipping Guide', href: '/guide' },
        { name: 'API Documentation', href: '/api' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Security', href: '/security' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ];

  return (
    <footer className="bg-blue-ocean text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Package className="w-8 h-8 text-secondary" />
                <span className="text-2xl font-bold">OceanShip</span>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted global shipping partner, delivering excellence 
                across 195+ countries with speed, security, and reliability.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-secondary" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-secondary" />
                  <span className="text-gray-300">support@oceanship.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-secondary" />
                  <span className="text-gray-300">New York, NY 10001</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-6 text-secondary">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-600 pt-8 mt-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Newsletter Signup */}
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-bold mb-4 text-secondary">
                Stay Updated
              </h3>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-orange-500 transition-all duration-200 font-medium"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-secondary hover:bg-white/20 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2024 OceanShip Global. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-secondary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
