import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Package, Lock, EyeOff, RefreshCw } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const ADMIN_PASSWORD = 'crochet123' // 👈 CHANGE THIS for production!

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [newProduct, setNewProduct] = useState({ 
    name: '', price: '', description: '', image: '', category: '' 
  })
  const [activeTab, setActiveTab] = useState('products')
  const [loading, setLoading] = useState(true)

  // Password protection
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('crochetAdmin', 'true')
    } else {
      alert('❌ Wrong password! Default: crochet123')
    }
  }

  // Auto-login
  useEffect(() => {
    if (localStorage.getItem('crochetAdmin') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('crochetAdmin')
  }

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true)
      const [productsRes, ordersRes] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/orders`)
      ])
      setProducts(productsRes.data)
      setOrders(ordersRes.data)
    } catch (error) {
      console.error('Admin fetch error:', error)
      alert('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    fetchData()
  }, [isAuthenticated])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/admin/products`, newProduct)
      setNewProduct({ name: '', price: '', description: '', image: '', category: '' })
      fetchData()
      alert('✅ Product added successfully!')
    } catch (error) {
      alert('❌ Error adding product')
    }
  }

  const deleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        await axios.delete(`${API}/admin/products/${id}`)
        fetchData()
        alert('✅ Product deleted!')
      } catch (error) {
        alert('❌ Delete failed')
      }
    }
  }

  // LOCK SCREEN - Customers can't access
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-br from-crochet-pink/10 to-crochet-lavender/10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-gradient-to-br from-crochet-pink/95 via-crochet-lavender/95 to-crochet-mint/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-4 border-white/20 text-white"
        >
          <Lock className="w-24 h-24 mx-auto mb-8 opacity-90" />
          <h2 className="text-5xl font-bold mb-6 text-center drop-shadow-lg">Admin Access 🔐</h2>
          <p className="text-xl mb-12 text-center opacity-90 leading-relaxed">
            Enter password to manage your crochet store
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-6 text-2xl rounded-3xl bg-white/20 backdrop-blur-sm border-2 border-white/30 focus:border-white focus:outline-none focus:ring-4 focus:ring-white/50 text-white placeholder-white/70"
                placeholder="Enter admin password"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                <EyeOff className="w-8 h-8" />
              </button>
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/20 backdrop-blur-sm text-white py-6 rounded-3xl font-bold text-2xl shadow-xl hover:shadow-2xl hover:bg-white/30 border-2 border-white/30 transition-all"
            >
              Unlock Admin Panel
            </motion.button>
          </form>
          
          <div className="mt-12 pt-8 border-t-2 border-white/20">
            <p className="text-lg opacity-75 text-center">
              💡 Default: <strong className="font-mono bg-black/20 px-3 py-1 rounded-xl">crochet123</strong>
            </p>
            <p className="text-sm opacity-60 mt-4 text-center">
              👈 Line 11: Change ADMIN_PASSWORD for production
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // ✅ ADMIN DASHBOARD (Secure Area)
  return (
    <div className="py-12 max-w-7xl mx-auto px-6">
      {/* Secure Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-16 bg-gradient-to-r from-crochet-pink/20 to-crochet-lavender/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-crochet-pink/30"
      >
        <div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent mb-2">
            Admin Dashboard 🔐
          </h1>
          <p className="text-xl text-gray-600">Securely managing CrochetBloom</p>
        </div>
        
        <div className="flex gap-4">
          <motion.button
            onClick={fetchData}
            whileHover={{ scale: 1.05 }}
            disabled={loading}
            className="bg-crochet-mint/80 text-gray-800 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>
          
          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
          >
            Logout 🔓
          </motion.button>
        </div>
      </motion.div>

      {/* Loading */}
      {loading && !products.length && (
        <div className="text-center py-24">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-crochet-pink mx-auto mb-8"></div>
          <p className="text-3xl font-bold text-gray-600">Loading store data...</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-white/70 backdrop-blur-sm rounded-3xl p-1 shadow-xl mb-16 max-w-2xl mx-auto">
        <motion.button 
          onClick={() => setActiveTab('products')}
          whileHover={{ scale: 1.02 }}
          className={`flex-1 py-6 px-8 rounded-2xl font-bold text-xl transition-all shadow-lg ${
            activeTab === 'products' 
              ? 'bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white' 
              : 'text-gray-700 hover:text-crochet-pink hover:shadow-xl bg-white/50'
          }`}
        >
          🧶 Products ({products.length})
        </motion.button>
        
        <motion.button 
          onClick={() => setActiveTab('orders')}
          whileHover={{ scale: 1.02 }}
          className={`flex-1 py-6 px-8 rounded-2xl font-bold text-xl transition-all shadow-lg ${
            activeTab === 'orders' 
              ? 'bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white' 
              : 'text-gray-700 hover:text-crochet-pink hover:shadow-xl bg-white/50'
          }`}
        >
          📦 Orders ({orders.length})
        </motion.button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <>
          {/* Add Product Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-crochet-pink/30 mb-16 max-w-6xl mx-auto"
          >
            <h3 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-crochet-pink to-crochet-mint bg-clip-text text-transparent">
              ➕ Add New Crochet Product
            </h3>
            
            <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="🌸 Product Name (e.g. Pink Rose Garland)"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="p-6 border-2 border-crochet-pink/30 rounded-3xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl font-semibold"
                required
              />
              <input
                type="number"
                placeholder="💰 Price (₹599)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="p-6 border-2 border-crochet-pink/30 rounded-3xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl font-semibold"
                required
              />
              <input
                type="text"
                placeholder="🖼️ Image URL (paste Unsplash link)"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="p-6 border-2 border-crochet-pink/30 rounded-3xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl md:col-span-2"
              />
              <input
                type="text"
                placeholder="🏷️ Category (Garlands, Coasters, Baskets)"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="p-6 border-2 border-crochet-pink/30 rounded-3xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl"
              />
              <textarea
                placeholder="✨ Description (keep it short & beautiful)"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="p-6 border-2 border-crochet-pink/30 rounded-3xl focus:border-crochet-pink focus:outline-none focus:ring-4 focus:ring-crochet-pink/20 text-xl md:col-span-2 resize-vertical"
                rows="3"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="md:col-span-2 bg-gradient-to-r from-crochet-pink to-crochet-lavender text-white py-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all"
              >
                <Plus className="w-10 h-10 inline mr-4 mb-1" />
                Add Crochet Product to Shop
              </motion.button>
            </form>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-crochet-lavender/30 group hover:border-crochet-pink/50 transition-all duration-300 overflow-hidden"
                whileHover={{ y: -8 }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="space-y-4">
                  <h4 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-2xl font-bold text-crochet-pink mb-3">₹{product.price}</p>
                  <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                  <p className="text-sm bg-crochet-mint/50 px-4 py-2 rounded-xl inline-block font-semibold">
                    {product.category}
                  </p>
                  
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pt-4">
                    <button className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg">
                      <Edit className="w-6 h-6 inline mr-2" /> Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transition-all shadow-lg"
                    >
                      <Trash2 className="w-6 h-6 inline mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {orders.length === 0 ? (
            <motion.div 
              className="text-center py-32 bg-white/70 backdrop-blur-sm rounded-3xl border-2 border-dashed border-crochet-pink/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Package className="w-32 h-32 text-gray-400 mx-auto mb-8" />
              <h3 className="text-4xl font-bold text-gray-500 mb-4">No orders yet</h3>
              <p className="text-xl text-gray-400">Customer orders will appear here!</p>
            </motion.div>
          ) : (
            orders.map((order) => (
              <motion.div
                key={order._id}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-l-8 border-crochet-pink hover:shadow-3xl transition-all hover:-translate-x-2"
                whileHover={{ x: 4 }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-3xl font-bold mb-2">#ORDER-{order._id.slice(-6).toUpperCase()}</h4>
                    <div className="flex gap-4 text-lg">
                      <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold">
                        ₹{order.total?.toLocaleString()}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-semibold">
                        {order.status || 'pending'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl bg-crochet-mint/50 px-6 py-3 rounded-2xl font-bold">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h5 className="text-2xl font-bold text-gray-800">Customer Details</h5>
                    <div className="space-y-2 text-lg">
                      <p><strong>{order.customer?.name}</strong></p>
                      <p>📞 {order.customer?.phone}</p>
                      <p className="text-gray-600">{order.customer?.address}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="text-2xl font-bold text-gray-800">Payment Details</h5>
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                      <p className="font-mono text-xl font-bold text-yellow-800 mb-2">
                        TXN: {order.upiTransactionId}
                      </p>
                      <p className="text-sm text-yellow-700">
                        💰 Verify UPI payment in PhonePe/Google Pay
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-2xl font-bold text-gray-800 mb-6">Order Items</h5>
                  <div className="space-y-4">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-6 bg-crochet-cream/50 rounded-2xl">
                        <div>
                          <p className="font-semibold text-xl">{item.name}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-2xl font-bold text-crochet-pink">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  )
}
