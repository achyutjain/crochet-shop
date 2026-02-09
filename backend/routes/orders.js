// // import express from 'express';
// // import Order from '../models/Order.js';
// // import Product from '../models/Product.js';
// // const router = express.Router();

// // router.post('/', async (req, res) => {
// //   try {
// //     const { customer, items, total } = req.body;
// //     const orderId = 'CROCHET-' + Date.now();
    
// //     // Enrich items with product details
// //     const enrichedItems = await Promise.all(items.map(async (item) => {
// //       const product = await Product.findById(item.productId);
// //       return {
// //         ...item,
// //         name: product?.name || item.name,
// //         image: product?.image || '',
// //         price: product?.price || item.price
// //       };
// //     }));

// //     const order = new Order({
// //       orderId,
// //       customer,
// //       items: enrichedItems,
// //       total
// //     });

// //     await order.save();
// //     res.json({ 
// //       success: true, 
// //       orderId,
// //       message: `Order ${orderId} created! Complete UPI payment below.`,
// //       upiId: process.env.UPI_ID
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // router.get('/', async (req, res) => {
// //   try {
// //     const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
// //     res.json(orders);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // export default router;
// const express = require('express');
// const Order = require('../models/Order');
// const router = express.Router();

// // POST /api/orders
// router.post('/', async (req, res) => {
//   try {
//     const { customer, items, total, upiTransactionId } = req.body;
//     const orderId = 'CROCHET-' + Date.now();
    
//     // Enrich items with product details
//     const enrichedItems = await Promise.all(items.map(async (item) => {
//       const product = await Product.findById(item.productId);
//       return {
//         ...item,
//         name: product?.name || item.name,
//         image: product?.image || '',
//         price: product?.price || item.price
//       };
//     }));

//     const order = new Order({
//       orderId,
//       customer,
//       items: enrichedItems,
//       total,
//       payment: {
//         method: 'UPI',
//         transactionId: upiTransactionId || 'pending'
//       }
//     });

//     await order.save();
//     res.json({ 
//       success: true, 
//       orderId,
//       message: `Order ${orderId} created! Complete UPI payment below.`,
//       upiId: process.env.UPI_ID || 'yourupi@paytm'
//     });
//   } catch (error) {
//     console.error('Order error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

//     await order.save();
//     res.status(201).json({ message: 'Order placed successfully!', orderId: order._id });
//   } catch (error) {
//     console.error('Order error:', error);
//     res.status(500).json({ error: 'Something went wrong. Please try again.' });
//   }
// });

// // GET /api/orders (Admin)
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find().populate('items.productId', 'name price image').sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');  // ← ADD THIS (missing!)
const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customer, items, total, upiTransactionId } = req.body;
    const orderId = 'CROCHET-' + Date.now();
    
    console.log('Order received:', { customerName: customer?.name, itemsCount: items?.length }); // Debug
    
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

    console.log('TXN ID received:', upiTransactionId); // Debug line

    const order = new Order({
      orderId,
      customer,
      items: enrichedItems,
      total,
      payment: {
        method: 'UPI',
        transactionId: upiTransactionId || 'pending',
        status: upiTransactionId ? 'verified' : 'pending'
      }
    });

    await order.save();
    console.log('Order saved:', orderId); // Debug
    
    res.json({ 
      success: true, 
      orderId,
      message: `Order ${orderId} created!`,
      upiId: process.env.UPI_ID || 'yourupi@paytm'
    });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json(orders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
