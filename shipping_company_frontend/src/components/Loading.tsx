'use client';

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

// PUBLIC_INTERFACE
export default function Loading({ text = 'Loading...', size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', text: 'text-sm' },
    md: { icon: 'w-12 h-12', text: 'text-base' },
    lg: { icon: 'w-16 h-16', text: 'text-lg' }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity }
        }}
        className={`${sizeClasses[size].icon} text-primary mb-4`}
      >
        <Package className="w-full h-full" />
      </motion.div>
      
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`${sizeClasses[size].text} text-gray-600 font-medium`}
      >
        {text}
      </motion.p>
    </div>
  );
}
