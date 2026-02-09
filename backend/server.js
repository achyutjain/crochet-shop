import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 👇 MIXED SYNTAX - Works with BOTH CommonJS & ES modules
const productRoutes = await import('./routes/products.js');
const orderRoutes = await import('./routes/orders.js');
const adminRoutes = await import('./routes/admin.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/products', productRoutes.default);
app.use('/api/orders', orderRoutes.default);
app.use('/api/admin', adminRoutes.default);
// app.use('/api/orders', require('./routes/orders'));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend: http://localhost:${PORT}`);
});
