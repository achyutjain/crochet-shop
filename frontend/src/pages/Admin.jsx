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
              <div className="md:col-span-2">
  <label className="block text-xl font-bold mb-4">🖼️ Product Image</label>
  
  {/* Gallery Upload */}
  <div className="mb-6 p-6 border-2 border-dashed border-crochet-pink/30 rounded-2xl hover:border-crochet-pink/50 transition-all cursor-pointer"
       onDragOver={(e) => e.preventDefault()}
       onDrop={(e) => {
         e.preventDefault();
         const file = e.dataTransfer.files[0];
         if (file && file.type.startsWith('image/')) {
           const reader = new FileReader();
           reader.onload = (e) => setNewProduct({...newProduct, image: e.target.result});
           reader.readAsDataURL(file);
         }
       }}>
    <input
      type="file"
      accept="image/*"
      className="hidden"
      id="image-upload"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => setNewProduct({...newProduct, image: e.target.result});
          reader.readAsDataURL(file);
        }
      }}
    />
    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
      <svg className="w-12 h-12 text-crochet-pink mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p className="text-lg font-medium mb-1">📱 Choose from Gallery or Drag & Drop</p>
      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
    </label>
  </div>
  
  {/* OR Google Link */}
  <div className="p-3 bg-gray-50 rounded-2xl">
    <p className="text-sm text-gray-600 mb-2">OR paste Google image link:</p>
    <input
      type="url"
      placeholder="https://example.com/crochet.jpg"
      value={newProduct.image}
      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
      className="w-full p-4 border border-crochet-pink/30 rounded-xl text-lg focus:ring-2 focus:ring-crochet-pink/50"
    />
  </div>
</div>

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
      {/* ORDERS TAB */}
<div className={`${activeTab === 'orders' ? 'block' : 'hidden'} space-y-6`}>
  <div className="flex justify-between items-center">
    <h2 className="text-4xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent">
      📋 Recent Orders
    </h2>
    <span className="text-2xl font-bold text-emerald-600">
      {orders.length} Orders
    </span>
  </div>

  <div className="grid gap-6">
    {orders.map((order) => (
      <motion.div
        key={order._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-crochet-pink/20 hover:shadow-3xl transition-all hover:-translate-y-2"
      >
        {/* Order Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Order #{order.orderId}</h3>
            <p className="text-emerald-600 text-xl font-semibold">₹{order.total?.toLocaleString()}</p>
          </div>
          <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${
            order.payment?.transactionId && order.payment.transactionId !== 'pending'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.payment?.transactionId && order.payment.transactionId !== 'pending'
              ? '✅ PAID'
              : '⏳ Pending'
            }
          </span>
        </div>

        {/* Customer Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
          <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">👤 Customer</h4>
            <p className="text-xl font-semibold">{order.customer.name}</p>
            <p className="text-lg">{order.customer.phone}</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">📍 Address</h4>
            <p className="text-gray-700 leading-relaxed">{order.customer.address}</p>
          </div>
        </div>

        {/* UPI Payment Details - NEW! */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl mb-6">
          <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
            💳 UPI Payment 
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              order.payment?.transactionId && order.payment.transactionId !== 'pending'
                ? 'bg-emerald-200 text-emerald-800'
                : 'bg-yellow-200 text-yellow-800'
            }`}>
              {order.payment?.transactionId ? order.payment.transactionId : 'No TXN ID'}
            </span>
          </h4>
          {order.payment?.transactionId && order.payment.transactionId !== 'pending' && (
            <div className="mt-2 p-3 bg-emerald-100 rounded-xl">
              <p className="font-mono text-sm text-emerald-800">
                TXN: <span className="font-bold">{order.payment.transactionId}</span>
              </p>
              <p className="text-xs text-emerald-700 mt-1">
                Method: {order.payment.method || 'UPI'}
              </p>
            </div>
          )}
        </div>
          {/* Add this after UPI section in each order card */}
<div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
  {/* Verify Button */}
  <button 
    onClick={() => {
      // Mark as verified
      toast.success(`✅ Order ${order.orderId} verified!`);
      // Here you can add API call later
    }}
    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg transition-all"
  >
    ✅ Verify TXN ID
  </button>
  
  {/* Ship Button */}
  <button 
    onClick={() => {
      // Mark as shipped
      toast.success(`📦 Order ${order.orderId} marked shipped!`);
      // Here you can add API call later
    }}
    className="px-6 py-3 bg-crochet-pink hover:bg-pink-600 text-white rounded-2xl font-bold shadow-lg transition-all ml-auto"
  >
    📦 Mark Shipped
  </button>
</div>


        {/* Order Items */}
        <div className="space-y-3">
          <h4 className="font-bold text-lg mb-3 text-gray-700 flex items-center gap-2">
            🛍️ Items ({order.items?.length || 0})
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-crochet-cream/50 rounded-xl">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-lg truncate">{item.name}</h5>
                  <p className="text-sm text-gray-600">₹{item.price?.toLocaleString()} x {item.quantity}</p>
                  <p className="text-sm font-medium text-emerald-600">
                    ₹{(item.price * item.quantity)?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-crochet-pink/20">
          <p className="text-sm text-gray-500 italic">
            📅 {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </motion.div>
    ))}
  </div>

  {orders.length === 0 && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-24"
    >
      <p className="text-2xl text-gray-500 mb-4">📭 No orders yet</p>
      <p className="text-lg text-gray-400">Share your shop link with customers! 🌸</p>
    </motion.div>
  )}
</div>

    </div>
  )
}
