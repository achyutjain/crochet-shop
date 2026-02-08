// // import { motion } from 'framer-motion'
// // import { Link } from 'react-router-dom'
// // import { Heart, ShoppingCart } from 'lucide-react'
// // import { useCart } from '../hooks/useCart.jsx'
// // import { toast } from 'react-hot-toast'

// // export default function ProductCard({ product }) {
// //   const { addToCart } = useCart()

// //   const handleAddToCart = () => {
// //     addToCart(product)
// //     toast.success(`${product.name} added to cart! ✨`, {
// //       duration: 3000,
// //       style: { background: '#F8C8DC', color: '#333' }
// //     })
// //   }

// //   return (
// //     <motion.div 
// //       whileHover={{ y: -12 }}
// //       className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/50 hover:border-crochet-pink/50 transition-all duration-500 overflow-hidden"
// //     >
// //       <div className="relative">
// //         <Link to={`/product/${product._id}`}>
// //           <motion.img 
// //             src={product.image} 
// //             alt={product.name}
// //             className="w-full h-64 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700 mb-6"
// //             whileHover={{ scale: 1.1 }}
// //           />
// //         </Link>
// //         <motion.button
// //           className="absolute top-4 right-4 p-3 bg-white/90 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
// //           whileHover={{ scale: 1.1 }}
// //           whileTap={{ scale: 0.95 }}
// //         >
// //           <Heart className="w-6 h-6 text-gray-600" />
// //         </motion.button>
// //       </div>
      
// //       <div className="space-y-4">
// //         <h3 className="text-2xl font-bold text-gray-800 group-hover:text-crochet-pink transition-colors">
// //           {product.name}
// //         </h3>
// //         <p className="text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
        
// //         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// //           <span className="text-3xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent">
// //             ₹{product.price}
// //           </span>
// //           <motion.button
// //             onClick={handleAddToCart}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="flex items-center gap-2 bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
// //           >
// //             <ShoppingCart className="w-5 h-5" />
// //             Add to Cart
// //           </motion.button>
// //         </div>
// //       </div>
// //     </motion.div>
// //   )
// // }
// // import { motion } from 'framer-motion'
// // import { Heart, ShoppingCart } from 'lucide-react'
// // import { useCart } from '../hooks/useCart.jsx'

// // export default function ProductCard({ product }) {
// //   const { addToCart } = useCart()

// //   return (
// //     <motion.div 
// //       whileHover={{ y: -8 }}
// //       className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-crochet-pink/30 overflow-hidden"
// //     >
// //       {/* ✅ BULLETPROOF IMAGE */}
// //       <div className="w-full h-64 bg-gradient-to-br from-crochet-pink/20 to-crochet-lavender/20 rounded-2xl overflow-hidden mb-6 flex items-center justify-center group-hover:bg-crochet-cream/30 transition-all">
// //         <img 
// //           src={product.image || 'https://picsum.photos/400/500?random=1'}
// //           alt={product.name}
// //           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
// //           onError={(e) => {
// //             // ✅ Fallback 1: Picsum
// //             e.target.src = 'https://picsum.photos/400/500?random=1';
// //           }}
// //           onErrorCapture={(e) => {
// //             // ✅ Fallback 2: Gradient placeholder
// //             e.target.style.display = 'none';
// //             e.target.parentNode.innerHTML = `
// //               <div class="w-full h-full bg-gradient-to-br from-crochet-pink/50 to-crochet-lavender/50 rounded-xl flex items-center justify-center">
// //                 <div class="text-4xl">🌸</div>
// //               </div>
// //             `;
// //           }}
// //         />
// //       </div>

// //       <div className="space-y-3">
// //         <h3 className="text-2xl font-bold text-gray-800 group-hover:text-crochet-pink transition-colors">
// //           {product.name}
// //         </h3>
        
// //         <div className="flex items-center justify-between">
// //           <span className="text-3xl font-bold text-crochet-pink">
// //             ₹{product.price}
// //           </span>
          
// //           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
// //             <button className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
// //               <Heart className="w-6 h-6" />
// //             </button>
            
// //             <motion.button
// //               whileTap={{ scale: 0.95 }}
// //               onClick={() => addToCart(product)}
// //               className="bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white p-3 rounded-xl hover:shadow-lg transition-all"
// //             >
// //               <ShoppingCart className="w-6 h-6" />
// //             </motion.button>
// //           </div>
// //         </div>
        
// //         <p className="text-sm text-gray-500">{product.category}</p>
// //       </div>
// //     </motion.div>
// //   )
// // }
// import { motion } from 'framer-motion'
// import { Heart, ShoppingCart } from 'lucide-react'
// import { useCart } from '../hooks/useCart.jsx'

// export default function ProductCard({ product }) {
//   const { addToCart } = useCart()

//   return (
//     <motion.div 
//       whileHover={{ y: -8 }}
//       className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-crochet-pink/30 overflow-hidden"
//     >
//       {/* ✅ BULLETPROOF IMAGE */}
//       <div className="w-full h-64 bg-gradient-to-br from-crochet-pink/20 to-crochet-lavender/20 rounded-2xl overflow-hidden mb-6 flex items-center justify-center group-hover:bg-crochet-cream/30 transition-all">
//         <img 
//           src={product.image || 'https://picsum.photos/400/500?random=1'}
//           alt={product.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           onError={(e) => {
//             // ✅ Fallback 1: Picsum
//             e.target.src = 'https://picsum.photos/400/500?random=1';
//           }}
//           onErrorCapture={(e) => {
//             // ✅ Fallback 2: Gradient placeholder
//             e.target.style.display = 'none';
//             e.target.parentNode.innerHTML = `
//               <div class="w-full h-full bg-gradient-to-br from-crochet-pink/50 to-crochet-lavender/50 rounded-xl flex items-center justify-center">
//                 <div class="text-4xl">🌸</div>
//               </div>
//             `;
//           }}
//         />
//       </div>

//       <div className="space-y-3">
//         <h3 className="text-2xl font-bold text-gray-800 group-hover:text-crochet-pink transition-colors">
//           {product.name}
//         </h3>
        
//         <div className="flex items-center justify-between">
//           <span className="text-3xl font-bold text-crochet-pink">
//             ₹{product.price}
//           </span>
          
//           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
//             <button className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
//               <Heart className="w-6 h-6" />
//             </button>
            
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={() => addToCart(product)}
//               className="bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white p-3 rounded-xl hover:shadow-lg transition-all"
//             >
//               <ShoppingCart className="w-6 h-6" />
//             </motion.button>
//           </div>
//         </div>
        
//         <p className="text-sm text-gray-500">{product.category}</p>
//       </div>
//     </motion.div>
//   )
// }
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../hooks/useCart.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-crochet-pink/30 overflow-hidden h-full flex flex-col"
    >
      {/* ✅ FIXED IMAGE CONTAINER */}
      <div className="w-full flex-grow mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 min-h-[250px] flex items-center justify-center relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            console.log('Image failed:', product.image);
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `
              <div class="w-full h-full bg-gradient-to-br from-crochet-pink/30 to-crochet-lavender/30 rounded-xl flex items-center justify-center p-8">
                <div class="text-5xl animate-pulse">🌸</div>
                <p class="text-sm text-gray-500 mt-2">${product.name}</p>
              </div>
            `;
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {product.category}
          </p>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-crochet-pink">
              ₹{product.price}
            </span>
            
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white py-3 px-6 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
