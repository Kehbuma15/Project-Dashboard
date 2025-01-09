import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import { ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const orderData = [
  { status: 'Pending', count: 45, color: '#F59E0B' },
  { status: 'Processing', count: 32, color: '#6366F1' },
  { status: 'Shipped', count: 78, color: '#10B981' },
  { status: 'Delivered', count: 156, color: '#8B5CF6' },
  { status: 'Cancelled', count: 12, color: '#EF4444' }
];

const hourlyOrders = [
  { hour: '00:00', orders: 12 },
  { hour: '04:00', orders: 8 },
  { hour: '08:00', orders: 25 },
  { hour: '12:00', orders: 45 },
  { hour: '16:00', orders: 38 },
  { hour: '20:00', orders: 28 }
];

const OrderStatusChart = () => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
    <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={orderData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="status" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151'
          }}
        />
        <Bar dataKey="count" fill="#6366F1">
          {orderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const OrderTimelineChart = () => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
    <h2 className="text-xl font-semibold mb-4">Orders Timeline</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={hourlyOrders}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="hour" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="#F59E0B" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const OrdersPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Orders' />
      
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Stats */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Orders"
            icon={ShoppingCart}
            value="323"
            color="#F59E0B"
          />
          <StatCard
            name="Pending"
            icon={Clock}
            value="45"
            color="#6366F1"
          />
          <StatCard
            name="Completed"
            icon={CheckCircle}
            value="234"
            color="#10B981"
          />
          <StatCard
            name="Cancelled"
            icon={XCircle}
            value="12"
            color="#EF4444"
          />
        </motion.div>

        {/* Recent Orders Table */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">#ORD-001</td>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">$245.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-01-09</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <OrderStatusChart />
          <OrderTimelineChart />
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;