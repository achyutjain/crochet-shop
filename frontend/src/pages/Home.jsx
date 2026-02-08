import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const { products } = useProducts()

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crochet-pink/20 via-crochet-lavender/20 to-crochet-mint/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612216794897-755803412b4f?w=2000')] bg-cover bg-center opacity-40"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10 max-w-4xl mx-auto px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent mb-6"
          >
            CrochetBloom
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Handcrafted flower magic for your home ✨
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/products"
              className="bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white px-12 py-6 rounded-3xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Shop Flowers
            </Link>
            <Link 
              to="/products"
              className="border-2 border-crochet-pink text-crochet-pink px-12 py-6 rounded-3xl font-bold text-xl hover:bg-crochet-pink hover:text-white transition-all duration-300"
            >
              View Collection
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-crochet-cream/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl text-center mb-20 bg-gradient-to-r from-crochet-pink to-crochet-mint bg-clip-text text-transparent"
          >
            Featured Blooms
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center mt-20"
          >
            <Link 
              to="/products"
              className="inline-block bg-gradient-to-r from-crochet-mint to-crochet-lavender text-white px-12 py-6 rounded-3xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View All Products →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
