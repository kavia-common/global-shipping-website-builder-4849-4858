'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronDown, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FAQ {
  question: string;
  answer: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  urgency: string;
}

// PUBLIC_INTERFACE
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqs: FAQ[] = [
    {
      question: 'How can I track my package?',
      answer: 'You can track your package using our tracking page by entering your tracking number. You\'ll get real-time updates on your shipment status, location, and estimated delivery time.'
    },
    {
      question: 'What are your shipping rates?',
      answer: 'Shipping rates vary based on package size, weight, destination, and service type. Use our shipping calculator for accurate pricing, or contact us for custom quotes on large shipments.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery times depend on the service level: Express (1-2 days), Standard (3-7 days), International Freight (7-21 days). Exact timing depends on origin and destination.'
    },
    {
      question: 'Do you provide insurance?',
      answer: 'Yes, we provide insurance coverage for all shipments. Express shipping includes up to $1,000 coverage, Standard includes $100, and International Freight offers full value coverage.'
    },
    {
      question: 'Can I schedule a pickup?',
      answer: 'Absolutely! You can schedule pickups through our website, mobile app, or by calling our customer service. We offer same-day and next-day pickup options in most areas.'
    },
    {
      question: 'What items cannot be shipped?',
      answer: 'We cannot ship hazardous materials, illegal items, perishables (unless specially arranged), and items prohibited by international shipping regulations. Contact us for specific item inquiries.'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: '24/7 customer service',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Response within 2 hours',
      contact: 'support@oceanship.com',
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant support available',
      contact: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Main headquarters',
      contact: '123 Shipping Ave, New York, NY 10001',
      action: 'Get Directions'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', urgency: 'normal' });
    }, 2000);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
              Contact & Support
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Get in touch with our support team. We&apos;re here to help with any questions 
              about your shipments, our services, or general inquiries.
            </motion.p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-ocean p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
                >
                  <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-ocean mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="font-medium text-gray-700 mb-4">{method.contact}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 text-sm font-medium"
                  >
                    {method.action}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-2 rounded-md transition-all duration-200 ${
                    activeTab === 'contact' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Contact Form
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-2 rounded-md transition-all duration-200 ${
                    activeTab === 'faq' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  FAQ
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-8"
                  >
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
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

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subject *
                            </label>
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Urgency Level
                            </label>
                            <select
                              name="urgency"
                              value={formData.urgency}
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
                              <option value="low">Low - General inquiry</option>
                              <option value="normal">Normal - Standard support</option>
                              <option value="high">High - Urgent issue</option>
                              <option value="critical">Critical - Emergency</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none outline-none transition-all duration-200"
                            onFocus={(e) => {
                              e.target.style.outline = '2px solid #2563EB';
                              e.target.style.outlineOffset = '2px';
                            }}
                            onBlur={(e) => {
                              e.target.style.outline = 'none';
                            }}
                            placeholder="Please describe your inquiry or issue in detail..."
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium text-lg disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            'Sending...'
                          ) : (
                            <>
                              <Send size={20} />
                              Send Message
                            </>
                          )}
                        </motion.button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-blue-ocean mb-4">Message Sent Successfully!</h3>
                        <p className="text-gray-600 mb-6">
                          Thank you for contacting us. We&apos;ll get back to you within 2 hours during business hours.
                        </p>
                        <motion.button
                          onClick={() => setIsSubmitted(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200"
                        >
                          Send Another Message
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
                        >
                          <h3 className="text-lg font-semibold text-blue-ocean pr-4">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedFAQ === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-200"
                            >
                              <div className="p-6 pt-4">
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-16 bg-blue-ocean text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Clock className="w-16 h-16 mx-auto mb-6 text-secondary" />
              <h2 className="text-3xl font-bold mb-6">We&apos;re Here When You Need Us</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Customer Service</h3>
                  <p>24/7 - Every day of the year</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Live Chat</h3>
                  <p>24/7 - Instant response</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">Phone Support</h3>
                  <p>24/7 - Multilingual support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
