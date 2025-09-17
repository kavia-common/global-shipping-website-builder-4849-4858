'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { 
  Package, CreditCard, MapPin, Bell, Settings, 
  Calendar, Download, Eye, Plus, BarChart3, Clock 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  destination: string;
  estimatedDelivery: string;
  service: string;
}

interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

// PUBLIC_INTERFACE
export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    accountNumber: 'AC123456',
    memberSince: '2020',
    totalShipments: 247,
    savedAddresses: 5
  });

  const [recentShipments] = useState<Shipment[]>([
    {
      id: '1',
      trackingNumber: 'OS123456789US',
      status: 'In Transit',
      destination: 'Los Angeles, CA',
      estimatedDelivery: 'Dec 20, 2024',
      service: 'Express'
    },
    {
      id: '2',
      trackingNumber: 'OS987654321US',
      status: 'Delivered',
      destination: 'Chicago, IL',
      estimatedDelivery: 'Dec 18, 2024',
      service: 'Standard'
    },
    {
      id: '3',
      trackingNumber: 'OS456123789US',
      status: 'Out for Delivery',
      destination: 'Miami, FL',
      estimatedDelivery: 'Today',
      service: 'Express'
    }
  ]);

  const [addresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      name: 'John Smith',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'US',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      name: 'John Smith',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      country: 'US',
      isDefault: false
    }
  ]);

  useEffect(() => {
    // Animate dashboard cards
    anime({
      targets: '.dashboard-card',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutQuart'
    });
  }, [activeTab]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in transit': return 'text-blue-600 bg-blue-100';
      case 'out for delivery': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'shipments', label: 'My Shipments', icon: Package },
    { id: 'addresses', label: 'Address Book', icon: MapPin },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Total Shipments</h3>
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <p className="text-3xl font-bold text-blue-ocean">{user.totalShipments}</p>
                <p className="text-sm text-gray-500">Since {user.memberSince}</p>
              </div>

              <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Active Shipments</h3>
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-3xl font-bold text-blue-ocean">2</p>
                <p className="text-sm text-gray-500">In transit</p>
              </div>

              <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Saved Addresses</h3>
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <p className="text-3xl font-bold text-blue-ocean">{user.savedAddresses}</p>
                <p className="text-sm text-gray-500">Ready to use</p>
              </div>

              <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">This Month</h3>
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-3xl font-bold text-blue-ocean">12</p>
                <p className="text-sm text-gray-500">Packages sent</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-ocean mb-6">Recent Shipments</h3>
              <div className="space-y-4">
                {recentShipments.slice(0, 3).map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Package className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold text-blue-ocean">{shipment.trackingNumber}</p>
                        <p className="text-sm text-gray-600">{shipment.destination}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'shipments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-ocean">My Shipments</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                New Shipment
              </motion.button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Tracking Number</th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Destination</th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Service</th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Delivery</th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentShipments.map((shipment) => (
                      <tr key={shipment.id} className="border-t border-gray-200">
                        <td className="px-6 py-4 font-medium text-blue-ocean">{shipment.trackingNumber}</td>
                        <td className="px-6 py-4 text-gray-700">{shipment.destination}</td>
                        <td className="px-6 py-4 text-gray-700">{shipment.service}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{shipment.estimatedDelivery}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-primary hover:bg-primary hover:text-white rounded transition-all duration-200">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-gray-600 hover:bg-gray-600 hover:text-white rounded transition-all duration-200">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-ocean">Address Book</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-ocean transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Address
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-blue-ocean">{address.label}</h3>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-secondary text-white text-xs rounded-full">Default</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-blue-ocean">Edit</button>
                      <button className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <p className="font-medium">{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-blue-ocean mb-4">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="text-xl font-bold text-blue-ocean">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Account: {user.accountNumber}</p>
                </div>
              </div>

              <nav className="bg-white rounded-xl shadow-lg p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                          activeTab === tab.id
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <tab.icon size={20} />
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
