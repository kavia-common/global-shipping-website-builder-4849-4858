'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { Search, Package, CheckCircle, Clock, MapPin } from 'lucide-react';

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

// PUBLIC_INTERFACE
export default function TrackingDashboard() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingEvent[] | null>(null);

  useEffect(() => {
    // Animate progress bar when tracking data loads
    if (trackingData) {
      anime({
        targets: '.progress-fill',
        width: '75%',
        duration: 1500,
        easing: 'easeOutQuart'
      });

      // Animate timeline items
      anime({
        targets: '.timeline-item',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
      });
    }
  }, [trackingData]);

  const mockTrackingData: TrackingEvent[] = [
    {
      id: '1',
      status: 'Package Picked Up',
      location: 'New York, NY',
      timestamp: '2024-01-15 09:30 AM',
      description: 'Package collected from sender',
      completed: true
    },
    {
      id: '2',
      status: 'In Transit',
      location: 'Chicago, IL',
      timestamp: '2024-01-15 02:45 PM',
      description: 'Package in transit to destination',
      completed: true
    },
    {
      id: '3',
      status: 'Out for Delivery',
      location: 'Los Angeles, CA',
      timestamp: '2024-01-16 08:15 AM',
      description: 'Package is out for delivery',
      completed: true
    },
    {
      id: '4',
      status: 'Delivered',
      location: 'Los Angeles, CA',
      timestamp: 'Expected: Today 5:00 PM',
      description: 'Package will be delivered soon',
      completed: false
    }
  ];

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setIsTracking(false);
    }, 1500);
  };

  const handleDemo = () => {
    setTrackingNumber('OS123456789US');
    setTrackingData(mockTrackingData);
  };

  return (
    <section className="py-20 bg-gradient-ocean">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-ocean mb-6">
            Track Your Package
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get real-time updates on your shipment status with our advanced tracking system
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Tracking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter tracking number (e.g., OS123456789US)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isTracking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 font-medium disabled:opacity-50"
              >
                {isTracking ? 'Tracking...' : 'Track Package'}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleDemo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium"
              >
                Try Demo
              </motion.button>
            </form>
          </motion.div>

          {/* Tracking Results */}
          <AnimatePresence>
            {trackingData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {/* Package Info */}
                <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-bold text-blue-ocean">Tracking Number</h3>
                      <p className="text-gray-600">{trackingNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-blue-ocean">Status</h4>
                    <p className="text-secondary font-medium">Out for Delivery</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>75% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="progress-fill bg-gradient-to-r from-primary to-secondary h-3 rounded-full w-0 transition-all duration-1500" />
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {trackingData.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="timeline-item relative flex items-start space-x-4"
                      >
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                          event.completed 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {event.completed ? (
                            <CheckCircle size={20} />
                          ) : (
                            <Clock size={20} />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-bold ${
                              event.completed ? 'text-blue-ocean' : 'text-gray-500'
                            }`}>
                              {event.status}
                            </h4>
                            <span className="text-sm text-gray-500">{event.timestamp}</span>
                          </div>
                          <p className="text-gray-600 mb-1">{event.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin size={14} className="mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200"
                    >
                      Get SMS Updates
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      Email Notifications
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Download Receipt
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
