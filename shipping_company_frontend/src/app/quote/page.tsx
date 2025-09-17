'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { 
  Package, MapPin, Calculator, CheckCircle, 
  ArrowRight, ArrowLeft
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  // Sender Info
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  senderCountry: string;

  // Recipient Info
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  recipientCountry: string;

  // Package Info
  weight: string;
  length: string;
  width: string;
  height: string;
  value: string;
  description: string;
  service: string;
}

interface QuoteResult {
  service: string;
  price: number;
  deliveryTime: string;
  features: string[];
}

// PUBLIC_INTERFACE
export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    senderName: '', senderEmail: '', senderPhone: '', senderAddress: '',
    senderCity: '', senderState: '', senderZip: '', senderCountry: 'US',
    recipientName: '', recipientEmail: '', recipientPhone: '', recipientAddress: '',
    recipientCity: '', recipientState: '', recipientZip: '', recipientCountry: 'US',
    weight: '', length: '', width: '', height: '', value: '', description: '', service: 'express'
  });
  const [quotes, setQuotes] = useState<QuoteResult[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const steps = [
    { number: 1, title: 'Sender Info', icon: MapPin },
    { number: 2, title: 'Recipient Info', icon: MapPin },
    { number: 3, title: 'Package Details', icon: Package },
    { number: 4, title: 'Quote Results', icon: Calculator },
    { number: 5, title: 'Confirmation', icon: CheckCircle }
  ];

  useEffect(() => {
    // Animate step indicators
    anime({
      targets: '.step-indicator',
      scale: [0.8, 1],
      duration: 600,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .6)'
    });
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculateQuotes = () => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockQuotes: QuoteResult[] = [
        {
          service: 'Express Shipping',
          price: 25.99,
          deliveryTime: '1-2 Business Days',
          features: ['Priority handling', 'Real-time tracking', 'Insurance included', 'Signature required']
        },
        {
          service: 'Standard Shipping',
          price: 12.99,
          deliveryTime: '3-7 Business Days',
          features: ['Standard tracking', 'Basic insurance', 'Residential delivery']
        },
        {
          service: 'Economy Shipping',
          price: 8.99,
          deliveryTime: '7-10 Business Days',
          features: ['Basic tracking', 'Ground transportation', 'Cost-effective']
        }
      ];
      
      setQuotes(mockQuotes);
      setIsCalculating(false);
      setCurrentStep(4);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 5) {
      if (currentStep === 3) {
        calculateQuotes();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-ocean mb-6">Sender Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  name="senderCountry"
                  value={formData.senderCountry}
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
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  name="senderState"
                  value={formData.senderState}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  name="senderZip"
                  value={formData.senderZip}
                  onChange={handleInputChange}
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-ocean mb-6">Recipient Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  name="recipientCountry"
                  value={formData.recipientCountry}
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
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  name="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="recipientCity"
                  value={formData.recipientCity}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  name="recipientState"
                  value={formData.recipientState}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  name="recipientZip"
                  value={formData.recipientZip}
                  onChange={handleInputChange}
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-ocean mb-6">Package Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Declared Value ($)</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  step="0.01"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Length (inches) *</label>
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (inches) *</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (inches) *</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none outline-none transition-all duration-200"
                  onFocus={(e) => {
                    e.target.style.outline = '2px solid #2563EB';
                    e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = 'none';
                  }}
                  placeholder="Describe the contents of your package..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {isCalculating ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-bold text-blue-ocean mb-2">Calculating Shipping Rates...</h3>
                <p className="text-gray-600">Please wait while we find the best rates for you.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-blue-ocean mb-6">Choose Your Shipping Option</h3>
                <div className="space-y-4">
                  {quotes.map((quote, index) => (
                    <motion.div
                      key={quote.service}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedQuote(quote)}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedQuote?.service === quote.service
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-blue-ocean">{quote.service}</h4>
                          <p className="text-gray-600">{quote.deliveryTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-secondary">${quote.price}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {quote.features.map((feature) => (
                          <div key={feature} className="flex items-center text-sm text-gray-600">
                            <CheckCircle size={14} className="text-green-500 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case 5:
        return (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-blue-ocean mb-4">Quote Generated Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Your shipping quote has been prepared. You can proceed to book this shipment or save it for later.
            </p>
            {selectedQuote && (
              <div className="bg-gray-50 p-6 rounded-xl mb-6 max-w-md mx-auto">
                <h4 className="font-bold text-blue-ocean mb-2">{selectedQuote.service}</h4>
                <p className="text-2xl font-bold text-secondary mb-2">${selectedQuote.price}</p>
                <p className="text-gray-600">{selectedQuote.deliveryTime}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium"
              >
                Book Shipment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium"
              >
                Save Quote
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              Get Your Shipping Quote
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Get instant, accurate shipping quotes in just a few steps. 
              Compare services and choose the best option for your needs.
            </motion.p>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex items-center space-x-4 overflow-x-auto">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`step-indicator flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                      currentStep >= step.number
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </div>
                    <div className="ml-3 min-w-max">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                      }`}>
                        Step {step.number}
                      </p>
                      <p className="text-xs text-gray-600">{step.title}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="mx-4 text-gray-300" size={20} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {currentStep < 5 && !isCalculating && (
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <motion.button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                      whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        currentStep === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ArrowLeft size={16} />
                      Previous
                    </motion.button>

                    <motion.button
                      onClick={nextStep}
                      disabled={currentStep === 4 && !selectedQuote}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      {currentStep === 3 ? 'Calculate Rates' : 'Next'}
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
