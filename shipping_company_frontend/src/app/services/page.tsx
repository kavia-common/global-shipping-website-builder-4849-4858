'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Calculator, Truck, Plane, Ship } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ServiceComparison {
  feature: string;
  express: boolean | string;
  standard: boolean | string;
  freight: boolean | string;
}

// PUBLIC_INTERFACE
export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState('express');

  const services = [
    {
      id: 'express',
      name: 'Express Shipping',
      icon: Plane,
      description: 'Fast, reliable delivery for urgent shipments',
      deliveryTime: '1-2 Business Days',
      price: 'From $25',
      features: [
        'Priority handling and processing',
        'Real-time tracking updates',
        'Signature required delivery',
        'Insurance up to $1,000 included',
        'Money-back guarantee',
        'Weekend delivery available'
      ],
      popular: true
    },
    {
      id: 'standard',
      name: 'Standard Shipping',
      icon: Truck,
      description: 'Cost-effective shipping for regular deliveries',
      deliveryTime: '3-7 Business Days',
      price: 'From $8',
      features: [
        'Reliable ground transportation',
        'Basic tracking included',
        'Secure packaging standards',
        'Insurance up to $100 included',
        'Delivery confirmation',
        'Residential delivery available'
      ]
    },
    {
      id: 'freight',
      name: 'International Freight',
      icon: Ship,
      description: 'Complete freight solutions for global trade',
      deliveryTime: '7-21 Business Days',
      price: 'Custom Quote',
      features: [
        'Ocean and air freight options',
        'Customs clearance assistance',
        'Door-to-door service',
        'Bulk shipping discounts',
        'Dedicated account manager',
        'Full cargo insurance'
      ]
    }
  ];

  const comparisonData: ServiceComparison[] = [
    { feature: 'Delivery Time', express: '1-2 Days', standard: '3-7 Days', freight: '7-21 Days' },
    { feature: 'Real-time Tracking', express: true, standard: true, freight: true },
    { feature: 'Insurance Included', express: '$1,000', standard: '$100', freight: 'Full Value' },
    { feature: 'Signature Required', express: true, standard: false, freight: true },
    { feature: 'Weekend Delivery', express: true, standard: false, freight: false },
    { feature: 'Customs Clearance', express: false, standard: false, freight: true },
    { feature: 'Bulk Discounts', express: false, standard: true, freight: true },
    { feature: 'Dedicated Support', express: true, standard: false, freight: true }
  ];

  const renderComparisonCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

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
              Our Shipping Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Choose from our comprehensive range of shipping solutions designed to meet 
              your specific needs, from express delivery to international freight.
            </motion.p>
          </div>
        </section>

        {/* Service Selection */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedService === service.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                  } ${service.popular ? 'ring-2 ring-secondary/20' : ''}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      selectedService === service.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      <service.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-ocean mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Delivery:</span>
                      <span className="font-bold text-primary">{service.deliveryTime}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Starting:</span>
                      <span className="font-bold text-blue-ocean">{service.price}</span>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-600">
                          <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedService === service.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                      }`}
                    >
                      Get Quote
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 bg-blue-ocean text-white">
                <h3 className="text-2xl font-bold text-center">Service Comparison</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Feature</th>
                      <th className="px-6 py-4 text-center font-medium text-gray-700">Express</th>
                      <th className="px-6 py-4 text-center font-medium text-gray-700">Standard</th>
                      <th className="px-6 py-4 text-center font-medium text-gray-700">Freight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-gray-700">{row.feature}</td>
                        <td className="px-6 py-4 text-center">{renderComparisonCell(row.express)}</td>
                        <td className="px-6 py-4 text-center">{renderComparisonCell(row.standard)}</td>
                        <td className="px-6 py-4 text-center">{renderComparisonCell(row.freight)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Shipping Calculator CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-ocean rounded-xl p-8 text-center"
            >
              <Calculator className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-blue-ocean mb-4">
                Need an Exact Quote?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Use our shipping calculator to get instant, accurate pricing for your specific needs. 
                Enter your package details and destination for a personalized quote.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium text-lg"
              >
                Calculate Shipping Cost
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
