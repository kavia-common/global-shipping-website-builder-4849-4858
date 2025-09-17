'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as anime from 'animejs';
import { Search, Package, MapPin, Clock, CheckCircle, AlertCircle, Bell, Download, Copy, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
  type: 'pickup' | 'transit' | 'delivery' | 'exception';
}

interface PackageInfo {
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  service: string;
  weight: string;
  events: TrackingEvent[];
}

// PUBLIC_INTERFACE
export default function TrackingPage() {
  const [trackingNumbers, setTrackingNumbers] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResults, setTrackingResults] = useState<PackageInfo[]>([]);
  const [notificationEmail, setNotificationEmail] = useState('');

  useEffect(() => {
    // Animate timeline when results load
    if (trackingResults.length > 0) {
      anime.default({
        targets: '.tracking-timeline .timeline-item',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600,
        delay: anime.default.stagger(150),
        easing: 'easeOutQuart'
      });
    }
  }, [trackingResults]);

  const mockTrackingData: PackageInfo[] = [
    {
      trackingNumber: 'OS123456789US',
      status: 'Out for Delivery',
      estimatedDelivery: 'Today by 6:00 PM',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      service: 'Express Shipping',
      weight: '2.5 lbs',
      events: [
        {
          id: '1',
          status: 'Package Picked Up',
          location: 'New York, NY 10001',
          timestamp: '2024-01-15 09:30 AM',
          description: 'Package collected from sender and processed at facility',
          completed: true,
          type: 'pickup'
        },
        {
          id: '2',
          status: 'In Transit',
          location: 'Chicago, IL 60601',
          timestamp: '2024-01-15 02:45 PM',
          description: 'Package arrived at sorting facility',
          completed: true,
          type: 'transit'
        },
        {
          id: '3',
          status: 'In Transit',
          location: 'Denver, CO 80201',
          timestamp: '2024-01-16 06:15 AM',
          description: 'Package in transit to destination city',
          completed: true,
          type: 'transit'
        },
        {
          id: '4',
          status: 'Out for Delivery',
          location: 'Los Angeles, CA 90001',
          timestamp: '2024-01-16 08:15 AM',
          description: 'Package is out for delivery with local courier',
          completed: true,
          type: 'delivery'
        },
        {
          id: '5',
          status: 'Delivered',
          location: 'Los Angeles, CA 90001',
          timestamp: 'Expected: Today 6:00 PM',
          description: 'Package will be delivered to recipient',
          completed: false,
          type: 'delivery'
        }
      ]
    }
  ];

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumbers.trim()) return;

    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResults(mockTrackingData);
      setIsTracking(false);
    }, 1500);
  };

  const handleNotificationSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification signup
    console.log('Notification signup:', notificationEmail);
  };

  const getStatusIcon = (type: string, completed: boolean) => {
    if (!completed) return <Clock className="w-5 h-5" />;
    
    switch (type) {
      case 'pickup': return <Package className="w-5 h-5" />;
      case 'transit': return <MapPin className="w-5 h-5" />;
      case 'delivery': return <CheckCircle className="w-5 h-5" />;
      case 'exception': return <AlertCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (type: string, completed: boolean) => {
    if (!completed) return 'bg-gray-200 text-gray-400';
    
    switch (type) {
      case 'pickup': return 'bg-blue-500 text-white';
      case 'transit': return 'bg-primary text-white';
      case 'delivery': return 'bg-green-500 text-white';
      case 'exception': return 'bg-red-500 text-white';
      default: return 'bg-primary text-white';
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
              Track Your Package
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            >
              Get real-time updates on your shipment status. Enter multiple tracking numbers 
              separated by commas for bulk tracking.
            </motion.p>

            {/* Bulk Tracking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={handleTrack} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                    <textarea
                      placeholder="Enter tracking numbers (separate multiple numbers with commas)&#10;Example: OS123456789US, OS987654321US, OS456123789US"
                      value={trackingNumbers}
                      onChange={(e) => setTrackingNumbers(e.target.value)}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg resize-none outline-none transition-all duration-200"
                      style={{ outline: 'none' }}
                      onFocus={(e) => {
                        e.target.style.outline = '2px solid #2563EB';
                        e.target.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.outline = 'none';
                      }}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      disabled={isTracking}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium disabled:opacity-50"
                    >
                      {isTracking ? 'Tracking...' : 'Track Packages'}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setTrackingNumbers('OS123456789US, OS987654321US');
                        setTrackingResults(mockTrackingData);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium"
                    >
                      Try Demo
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Tracking Results */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence>
              {trackingResults.map((result, index) => (
                <motion.div
                  key={result.trackingNumber}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="max-w-4xl mx-auto mb-8 bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Package Header */}
                  <div className="bg-blue-ocean text-white p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Tracking Number: {result.trackingNumber}</h3>
                        <p className="text-blue-200">Service: {result.service}</p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200"
                          title="Copy tracking number"
                        >
                          <Copy size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200"
                          title="Share tracking info"
                        >
                          <Share2 size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200"
                          title="Download receipt"
                        >
                          <Download size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Package Status */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <h4 className="font-bold text-blue-ocean mb-2">Current Status</h4>
                        <p className="text-2xl font-bold text-secondary">{result.status}</p>
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-blue-ocean mb-2">Estimated Delivery</h4>
                        <p className="text-lg font-medium text-gray-700">{result.estimatedDelivery}</p>
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-blue-ocean mb-2">Route</h4>
                        <p className="text-sm text-gray-600">{result.origin} → {result.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="p-6 tracking-timeline">
                    <h4 className="text-xl font-bold text-blue-ocean mb-6">Tracking History</h4>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                      <div className="space-y-6">
                        {result.events.map((event) => (
                          <div
                            key={event.id}
                            className="timeline-item relative flex items-start space-x-4"
                          >
                            <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(event.type, event.completed)}`}>
                              {getStatusIcon(event.type, event.completed)}
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className={`font-bold ${event.completed ? 'text-blue-ocean' : 'text-gray-500'}`}>
                                  {event.status}
                                </h5>
                                <span className="text-sm text-gray-500">{event.timestamp}</span>
                              </div>
                              <p className="text-gray-600 mb-1">{event.description}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin size={14} className="mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notification Signup */}
                  <div className="p-6 bg-gray-50">
                    <h4 className="text-lg font-bold text-blue-ocean mb-4">Get Delivery Updates</h4>
                    <form onSubmit={handleNotificationSignup} className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        placeholder="Enter email for notifications"
                        value={notificationEmail}
                        onChange={(e) => setNotificationEmail(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200"
                        onFocus={(e) => {
                          e.target.style.outline = '2px solid #2563EB';
                          e.target.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.target.style.outline = 'none';
                        }}
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium flex items-center gap-2"
                      >
                        <Bell size={16} />
                        Subscribe
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
