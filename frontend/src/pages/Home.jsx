// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import { useProducts } from '../hooks/useProducts.js'
// import ProductCard from '../components/ProductCard.jsx'

// export default function Home() {
//   const { products } = useProducts()

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-crochet-pink/20 via-crochet-lavender/20 to-crochet-mint/20"></div>
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612216794897-755803412b4f?w=2000')] bg-cover bg-center opacity-40"></div>
        
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center z-10 max-w-4xl mx-auto px-6"
//         >
//           <motion.h1 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent mb-6"
//           >
//             CrochetBloom
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
//           >
//             Handcrafted flower magic for your home ✨
//           </motion.p>
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//           >
//             <Link 
//               to="/products"
//               className="bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white px-12 py-6 rounded-3xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
//             >
//               Shop Flowers
//             </Link>
//             <Link 
//               to="/products"
//               className="border-2 border-crochet-pink text-crochet-pink px-12 py-6 rounded-3xl font-bold text-xl hover:bg-crochet-pink hover:text-white transition-all duration-300"
//             >
//               View Collection
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-24 bg-crochet-cream/30">
//         <div className="max-w-6xl mx-auto px-6">
//           <motion.h2 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-6xl text-center mb-20 bg-gradient-to-r from-crochet-pink to-crochet-mint bg-clip-text text-transparent"
//           >
//             Featured Blooms
//           </motion.h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.slice(0, 6).map((product, index) => (
//               <motion.div
//                 key={product._id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <ProductCard product={product} />
//               </motion.div>
//             ))}
//           </div>
          
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             className="text-center mt-20"
//           >
//             <Link 
//               to="/products"
//               className="inline-block bg-gradient-to-r from-crochet-mint to-crochet-lavender text-white px-12 py-6 rounded-3xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
//             >
//               View All Products →
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   )
// }
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const { products } = useProducts()

  // Floating flowers animation variants
  const floatingFlowerVariants = {
    animate: {
      y: [0, -30, 0],
      rotate: [0, 15, -15, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      {/* Floating Background Flowers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full opacity-30 blur-xl"
          variants={floatingFlowerVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-40 left-24 w-20 h-20 bg-gradient-to-r from-purple-300 via-lavender-300 to-purple-400 rounded-full opacity-40 blur-lg"
          variants={floatingFlowerVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-mint-300 via-emerald-300 to-mint-400 rounded-full opacity-30 blur-xl"
          variants={floatingFlowerVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-crochet-pink/20 via-crochet-lavender/20 to-crochet-mint/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612216794897-755803412b4f?w=2000')] bg-cover bg-center opacity-40"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 max-w-4xl mx-auto px-6"
        >
          <motion.div 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="flex justify-center mb-8"
          >
            <svg className="w-24 h-24" fill="none" stroke="url(#gradient)" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--crochet-pink)" />
                  <stop offset="50%" stopColor="var(--crochet-lavender)" />
                  <stop offset="100%" stopColor="var(--crochet-mint)" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent mb-6 leading-tight"
          >
            CrochetBloom
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Handcrafted flower magic for your home ✨
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/products"
                className="bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                🛍️ Shop Flowers
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/products"
                className="border-4 border-crochet-pink text-crochet-pink px-12 py-6 rounded-3xl font-bold text-xl hover:bg-crochet-pink hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                👀 View Collection
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-crochet-cream/50 to-white/70 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl text-center mb-20 bg-gradient-to-r from-crochet-pink via-crochet-lavender to-crochet-mint bg-clip-text text-transparent font-bold"
          >
            🌸 Featured Blooms
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15 
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02, 
                  transition: { duration: 0.3 }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-24"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/products"
                className="inline-block bg-gradient-to-r from-crochet-mint to-crochet-lavender text-white px-16 py-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                🌟 View All Products →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
                  {/* Our Story & Testimonials */}
      <section className="py-24 bg-gradient-to-t from-crochet-cream/80 to-white/50 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Our Story */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent mb-8">
              Our Story
            </h2>
            <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Creator Image */}
              <motion.div 
                initial={{ scale: 0.9, rotate: -5 }}
                whileInView={{ scale: 1, rotate: 0 }}
                className="relative"
              >
                <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-crochet-pink/20 to-crochet-lavender/20 border-8 border-white shadow-2xl mx-auto relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3107?w=400&fit=crop&crop=face" 
                    alt="Priya - CrochetBloom Creator"
                    className="w-full h-full object-cover rounded-2xl absolute inset-0"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-crochet-mint/30 rounded-2xl blur-xl rotate-12"></div>
                </div>
              </motion.div>

              {/* Creator Bio */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="h-1 w-24 bg-gradient-to-r from-crochet-pink to-crochet-lavender rounded-full"></div>
                <h3 className="text-4xl font-bold text-gray-800">Meet Priya 🌸</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  "Hi! I'm <span className="font-bold text-crochet-pink">Priya Sharma</span>, a crochet artist from Jodhpur. 
                  What started as a hobby during lockdown has become my passion! 
                  Each flower is handcrafted with love using premium cotton threads. 
                  My goal? Bring joy to your home, one stitch at a time! 💕"
                </p>
                <div className="flex gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="bg-crochet-pink text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl"
                  >
                    Our Story →
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="border-2 border-crochet-lavender text-crochet-lavender px-8 py-4 rounded-2xl font-bold text-lg hover:bg-crochet-lavender hover:text-white"
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Loved by 500+ Happy Customers ✨
            </h3>
            <p className="text-xl text-gray-600 mb-20 max-w-2xl mx-auto">
              Don't take our word for it...
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-crochet-pink/20 hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Priya R.</h4>
                    <p className="text-sm text-gray-500">Mumbai</p>
                  </div>
                </div>
                <p className="text-lg italic mb-6 text-gray-700 leading-relaxed">
                  "Ordered garland for sister's wedding - arrived in 2 days! 
                  Quality is restaurant-level beautiful. Will order again! 🔥"
                </p>
                <div className="flex text-yellow-400 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-crochet-mint/20 hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Amit K.</h4>
                    <p className="text-sm text-gray-500">Delhi</p>
                  </div>
                </div>
                <p className="text-lg italic mb-6 text-gray-700 leading-relaxed">
                  "Packaging was premium! Coasters look handmade luxury. 
                  Delivery boy said even he wants to buy! 5⭐ service."
                </p>
                <div className="flex text-yellow-400 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-crochet-lavender/20 hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Neha S.</h4>
                    <p className="text-sm text-gray-500">Jaipur</p>
                  </div>
                </div>
                <p className="text-lg italic mb-6 text-gray-700 leading-relaxed">
                  "Same day dispatch! Flowers brighter than pictures. 
                  Already gifted to mom - she cried happy tears! 😍"
                </p>
                <div className="flex text-yellow-400 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator */}
      {/* <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      >
        <div className="w-2 h-10 bg-gradient-to-t from-crochet-pink to-transparent rounded-full"></div>
      </motion.div> */}
    </>
  )
}
