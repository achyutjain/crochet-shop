import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'  // ← CHANGE THIS
import { useCart } from '../hooks/useCart.jsx'

export default function InstagramButton() {
  const { cart } = useCart()
  
  const instagramUsername = "achyut_jain"  // ← YOUR INSTAGRAM HANDLE
  
  const getOrderMessage = () => {
    if (cart.length === 0) {
      return "🌸 Hi! Love your crochet flowers! What's available for order? 💕"
    }
    
    const items = cart.map(item => `• ${item.name} (x${item.quantity}) ₹${item.price}`).join('\n')
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    return `🛒 *ORDER REQUEST* 🌸\n\n${items}\n\n💰 *Total: ₹${total.toLocaleString()}*\n\nPlease confirm availability! 📦`
  }

  const handleInstagramClick = () => {
    const message = getOrderMessage()
    // Instagram DM link (opens Instagram app/profile)
    const instagramURL = `https://www.instagram.com/direct/inbox/?username=${instagramUsername.replace('@', '')}`
    window.open(instagramURL, '_blank')
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={handleInstagramClick}
        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-[#E4405F] via-[#F77737] to-[#FCAF45] shadow-2xl border-4 border-white flex items-center justify-center text-white hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:rotate-12"
        title="Order via Instagram DM"
      >
<Instagram className="w-7 h-7 lg:w-8 lg:h-8 drop-shadow-md" />
      </button>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg whitespace-nowrap"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
      >
        Order via Instagram 📸
      </motion.div>
    </motion.div>
  )
}
