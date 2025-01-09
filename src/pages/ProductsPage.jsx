import { AlertTriangle, DollarSign, Package, TrendingUp, } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'
import StatCard from '../components/common/StatCard'
import Header from '../components/common/Header'
import ProductTable from '../components/common/ProductTable'
import SalesTrendChart from '../components/SalesTrendChart'
import SalesChannelChart from '../components/overview/SalesChannelChart'
import SalesOverviewChart from '../components/overview/SalesOverviewChart'
import CategoryOverviewChart from '../components/overview/CategoryOverviewChart'

const ProductsPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
    <Header title='Products'/>

    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
     {/* STATS */}
     <motion.div
     className = 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
     initial = {{opacity: 0, y:20}}
     animate = {{opacity: 1, y:0}}
     transition={{duration: 1}}
     >
       <StatCard name='Total Products' icon={Package} value={1234} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
     </motion.div>

     <ProductTable/>

     {/* CHARTS */}

     <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <SalesTrendChart/>
        <CategoryOverviewChart/>
     </div>
     </main>
     </div>
  )
}

export default ProductsPage
