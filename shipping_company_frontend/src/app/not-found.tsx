'use client';

import { motion } from 'framer-motion';
import { Home, Search, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Package className="w-24 h-24 text-secondary mx-auto" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-ocean mb-4">
            Package Not Found
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
            Oops! The page you&apos;re looking for seems to have been shipped to another location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium flex items-center gap-2"
            >
              <Home size={20} />
              Go Home
            </motion.button>
          </Link>
          
          <Link href="/tracking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium flex items-center gap-2"
            >
              <Search size={20} />
              Track Package
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <Link href="/" className="text-primary hover:text-blue-ocean transition-colors duration-200 flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Back to OceanShip Global
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
