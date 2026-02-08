import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    const orderId = 'CROCHET-' + Date.now();
    
    // Enrich items with product details
    const enrichedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        ...item,
        name: product?.name || item.name,
        image: product?.image || '',
        price: product?.price || item.price
      };
    }));

    const order = new Order({
      orderId,
      customer,
      items: enrichedItems,
      total
    });

    await order.save();
    res.json({ 
      success: true, 
      orderId,
      message: `Order ${orderId} created! Complete UPI payment below.`,
      upiId: process.env.UPI_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
