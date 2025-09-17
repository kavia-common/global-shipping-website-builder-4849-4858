'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Package, ArrowRight } from 'lucide-react';

interface CalculatorData {
  fromZip: string;
  toZip: string;
  weight: string;
  service: string;
}

interface RateResult {
  service: string;
  price: number;
  deliveryTime: string;
}

// PUBLIC_INTERFACE
export default function ShippingCalculator() {
  const [formData, setFormData] = useState<CalculatorData>({
    fromZip: '',
    toZip: '',
    weight: '',
    service: 'express'
  });
  const [rates, setRates] = useState<RateResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculateRates = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate API call
    setTimeout(() => {
      const mockRates: RateResult[] = [
        { service: 'Express', price: 25.99, deliveryTime: '1-2 days' },
        { service: 'Standard', price: 12.99, deliveryTime: '3-7 days' },
        { service: 'Economy', price: 8.99, deliveryTime: '7-10 days' }
      ];
      setRates(mockRates);
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-primary" />
        <h3 className="text-2xl font-bold text-blue-ocean">Quick Rate Calculator</h3>
      </div>

      <form onSubmit={calculateRates} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              From ZIP Code
            </label>
            <input
              type="text"
              name="fromZip"
              value={formData.fromZip}
              onChange={handleInputChange}
              placeholder="10001"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200"
              onFocus={(e) => {
                e.target.style.outline = '2px solid #2563EB';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              To ZIP Code
            </label>
            <input
              type="text"
              name="toZip"
              value={formData.toZip}
              onChange={handleInputChange}
              placeholder="90210"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200"
              onFocus={(e) => {
                e.target.style.outline = '2px solid #2563EB';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="inline w-4 h-4 mr-1" />
              Weight (lbs)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="2.5"
              required
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200"
              onFocus={(e) => {
                e.target.style.outline = '2px solid #2563EB';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Level</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200"
              onFocus={(e) => {
                e.target.style.outline = '2px solid #2563EB';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              <option value="express">Express</option>
              <option value="standard">Standard</option>
              <option value="economy">Economy</option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isCalculating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isCalculating ? (
            'Calculating...'
          ) : (
            <>
              <Calculator size={20} />
              Calculate Rates
              <ArrowRight size={20} />
            </>
          )}
        </motion.button>
      </form>

      {rates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <h4 className="text-lg font-bold text-blue-ocean mb-4">Estimated Rates</h4>
          <div className="space-y-3">
            {rates.map((rate) => (
              <div key={rate.service} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-ocean">{rate.service}</p>
                  <p className="text-sm text-gray-600">{rate.deliveryTime}</p>
                </div>
                <p className="text-xl font-bold text-secondary">${rate.price}</p>
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            Get Detailed Quote
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
