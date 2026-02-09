import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useCart } from '../hooks/useCart.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    upiTransactionId: ''
  })
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    const orderData = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      },
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: total,
      upiTransactionId: formData.upiTransactionId  // ← ADD THIS LINE!

    }

    console.log('Sending order:', orderData); // Debug

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData)
    
    console.log('Order success:', response.data); // Debug
    
    toast.success('✅ Order placed successfully! Check admin panel.', {
      duration: 5000,
      style: { background: '#D4F4DD', color: '#333' }
    })
    
    clearCart()
    setPaymentCompleted(true)
  } catch (error) {
    console.error('Order error:', error.response?.data || error.message); // Debug
    toast.error('❌ Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}

  if (paymentCompleted) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-emerald-50 to-crochet-mint/50 rounded-3xl p-20 border-8 border-emerald-200"
        >
          <CheckCircle className="w-32 h-32 text-emerald-500 mx-auto mb-8" />
          <h2 className="text-6xl font-bold text-emerald-600 mb-6">Order Confirmed!</h2>
          <p className="text-2xl text-gray-700 mb-12">Thank you for your purchase. We'll deliver within 2 days! 🌸</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-6 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="py-24 max-w-4xl mx-auto px-6">
      < motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-crochet-pink/30"
      >
        <div className="flex items-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-gray-700 hover:text-crochet-pink font-semibold mb-8 p-3 rounded-2xl hover:bg-crochet-cream transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customer Info */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Delivery Details</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-5 border-2 border-crochet-pink/30 rounded-2xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-5 border-2 border-crochet-pink/30 rounded-2xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Delivery Address</label>
                <textarea
                  required
                  rows="4"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full p-5 border-2 border-crochet-pink/30 rounded-2xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl resize-vertical"
                  placeholder="House number, street, city, pincode"
                />
              </div>

              <div>
  <label className="block text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
    💳 UPI Transaction ID <span className="text-sm">(MANDATORY)</span>
  </label>
  <div className="p-4 mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl">
    <div className="flex items-center gap-3 mb-3 p-3 bg-yellow-100 rounded-xl">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <p className="text-sm font-medium text-gray-800">
        <strong>Step 1:</strong> Pay to <span className="font-bold text-lg">yourupi@paytm</span>
      </p>
    </div>
    <p className="text-sm text-gray-700 mb-4">
      <strong>Step 2:</strong> Enter EXACT Transaction ID from your UPI app
    </p>
    <div className="grid grid-cols-2 gap-3 text-xs bg-gray-100 p-3 rounded-xl mb-3">
      <div>
        <strong>✅ Valid examples:</strong>
        <div className="font-mono text-emerald-600 text-sm mt-1">TXN123456789</div>
        <div className="font-mono text-emerald-600 text-sm">20250110T123456</div>
      </div>
      <div>
        <strong>❌ Invalid:</strong>
        <div className="font-mono text-red-600 text-sm mt-1">123456</div>
        <div className="font-mono text-red-600 text-sm">upi payment</div>
      </div>
    </div>
  </div>
  <input
    type="text"
    required
    placeholder="TXN123456789 (Copy from UPI app)"
    value={formData.upiTransactionId}
    onChange={(e) => setFormData({...formData, upiTransactionId: e.target.value})}
    className="w-full p-6 border-3 border-crochet-pink/50 rounded-3xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 text-xl font-mono tracking-wider bg-gradient-to-r from-white to-gray-50"
  />
</div>


              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()} →`}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky top-32">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Order Summary</h3>
            
            <div className="bg-crochet-cream/50 rounded-2xl p-8 mb-8">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between py-3 border-b border-crochet-pink/20 last:border-b-0">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between pt-6 border-t border-crochet-pink/30 text-2xl font-bold">
                <span>Total:</span>
                <span className="text-crochet-pink">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    )
}
