import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../hooks/useCart.jsx'

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-crochet-pink/20 to-crochet-lavender/20 rounded-3xl p-20"
        >
          <div className="w-24 h-24 bg-crochet-cream rounded-full mx-auto mb-8 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-5xl font-bold text-gray-700 mb-6">Your cart is empty</h2>
          <p className="text-xl text-gray-500 mb-12">Add some beautiful crochet flowers to get started!</p>
          <Link 
            to="/products" 
            className="bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white px-12 py-6 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all"
          >
            Continue Shopping →
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="py-24 max-w-6xl mx-auto px-6">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent text-center mb-20"
      >
        Your Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              key={item._id}
              className="flex gap-6 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-crochet-pink/30"
            >
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-2xl flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-6">₹{item.price} each</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-crochet-cream p-2 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-2 hover:bg-crochet-pink/20 rounded-lg transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-2 font-bold text-xl min-w-[3rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 hover:bg-crochet-pink/20 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="text-2xl font-bold text-crochet-pink">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all ml-auto"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky top-24 h-fit bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-crochet-lavender/30"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Order Summary</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-xl">
              <span>Total ({cart.length} items):</span>
              <span className="font-bold text-crochet-pink">₹{total.toLocaleString()}</span>
            </div>
          </div>
          
          <motion.button
            onClick={() => navigate('/checkout')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            Proceed to Checkout →
          </motion.button>
          
          <button
            onClick={clearCart}
            className="w-full mt-4 text-red-500 hover:text-red-700 font-semibold py-3 border border-red-200 rounded-2xl hover:bg-red-50 transition-all"
          >
            Clear Cart
          </button>
        </motion.div>
      </div>
    </div>
  )
}
