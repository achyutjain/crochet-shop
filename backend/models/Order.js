// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   orderId: { type: String, unique: true },
//   customer: {
//     name: String,
//     phone: String,
//     email: String,
//     address: String
//   },
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     name: String,
//     price: Number,
//     quantity: Number,
//     image: String
//   }],
//   total: Number,
//   status: { type: String, default: 'pending' },
//   paymentMethod: { type: String, default: 'UPI' },
//   upiTransactionId: String
// }, { timestamps: true });

// export default mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  upiTransactionId: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
