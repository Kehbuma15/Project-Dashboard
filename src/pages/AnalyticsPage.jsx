import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { day: 'Mon', desktop: 1500, mobile: 900, tablet: 500 },
  { day: 'Tue', desktop: 2000, mobile: 1200, tablet: 600 },
  { day: 'Wed', desktop: 1800, mobile: 1100, tablet: 550 },
  { day: 'Thu', desktop: 2200, mobile: 1300, tablet: 700 },
  { day: 'Fri', desktop: 2500, mobile: 1400, tablet: 800 },
  { day: 'Sat', desktop: 1900, mobile: 1500, tablet: 900 },
  { day: 'Sun', desktop: 1700, mobile: 1000, tablet: 400 }
];

const conversionData = [
  { month: 'Jan', rate: 2.5 },
  { month: 'Feb', rate: 2.8 },
  { month: 'Mar', rate: 3.2 },
  { month: 'Apr', rate: 3.5 },
  { month: 'May', rate: 3.7 },
  { month: 'Jun', rate: 4.0 }
];

const TrafficChart = () => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
    <h2 className="text-xl font-semibold mb-4">Traffic by Device</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={trafficData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151'
          }}
        />
        <Area type="monotone" dataKey="desktop" stackId="1" stroke="#6366F1" fill="#6366F1" />
        <Area type="monotone" dataKey="mobile" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
        <Area type="monotone" dataKey="tablet" stackId="1" stroke="#FC4899" fill="#FC4899" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const ConversionChart = () => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
    <h2 className="text-xl font-semibold mb-4">Conversion Rate Trend</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={conversionData}>
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
          dataKey="rate" 
          stroke="#10B981" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AnalyticsPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Analytics' />
      
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Stats */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Visits"
            icon={Users}
            value="15.2K"
            color="#6366F1"
          />
          <StatCard
            name="Avg. Time"
            icon={Clock}
            value="5m 32s"
            color="#8B5CF6"
          />
          <StatCard
            name="Growth"
            icon={TrendingUp}
            value="+22.4%"
            color="#FC4899"
          />
          <StatCard
            name="Conversion"
            icon={Target}
            value="4.0%"
            color="#10B981"
          />
        </motion.div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <TrafficChart />
          <ConversionChart />
        </div>

        {/* Key Metrics Table */}
        <div className="mt-8 bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Metric</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Bounce Rate</td>
                  <td className="px-6 py-4 whitespace-nowrap">42.3%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400">-2.1%</td>
                  <td className="px-6 py-4 whitespace-nowrap">↘️</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Pages/Session</td>
                  <td className="px-6 py-4 whitespace-nowrap">3.8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400">+0.5</td>
                  <td className="px-6 py-4 whitespace-nowrap">↗️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;