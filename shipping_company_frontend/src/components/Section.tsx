'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

// PUBLIC_INTERFACE
export default function Section({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'md',
  animate = true 
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-ocean'
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-20'
  };

  const content = (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
