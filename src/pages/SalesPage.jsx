import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import { DollarSign, TrendingUp, ShoppingCart, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlySalesData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 }
];

const salesByProduct = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Books', value: 20 },
  { name: 'Home', value: 20 }
];

const COLORS = ['#6366F1', '#8B5CF6', '#FC4899', '#10B981'];

const RevenueTrendChart = () => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
    <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlySalesData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937',
            border: '1px solid #374151'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#6366F1" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const SalesByProductChart = () => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
    <h2 className="text-xl font-semibold mb-4">Sales by Product Category</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={salesByProduct}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {salesByProduct.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937',
            border: '1px solid #374151'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {salesByProduct.map((item, index) => (
        <div key={item.name} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          />
          <span className="text-sm">{item.name}: {item.value}%</span>
        </div>
      ))}
    </div>
  </div>
);

const SalesPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Sales' />
      
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Stats */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value="$328,000"
            color="#6366F1"
          />
          <StatCard
            name="Growth Rate"
            icon={TrendingUp}
            value="+15.3%"
            color="#8B5CF6"
          />
          <StatCard
            name="Orders"
            icon={ShoppingCart}
            value="1,423"
            color="#FC4899"
          />
          <StatCard
            name="Conversion"
            icon={ArrowUpRight}
            value="3.2%"
            color="#10B981"
          />
        </motion.div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <RevenueTrendChart />
          <SalesByProductChart />
        </div>
      </main>
    </div>
  );
};

export default SalesPage;