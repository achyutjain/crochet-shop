// // // import mongoose from 'mongoose';

// // // const orderSchema = new mongoose.Schema({
// // //   orderId: { type: String, unique: true },
// // //   customer: {
// // //     name: String,
// // //     phone: String,
// // //     email: String,
// // //     address: String
// // //   },
// // //   items: [{
// // //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// // //     name: String,
// // //     price: Number,
// // //     quantity: Number,
// // //     image: String
// // //   }],
// // //   total: Number,
// // //   status: { type: String, default: 'pending' },
// // //   paymentMethod: { type: String, default: 'UPI' },
// // //   upiTransactionId: String
// // // }, { timestamps: true });

// // // export default mongoose.model('Order', orderSchema);
// // // commented after this
// // const mongoose = require('mongoose');

// // const orderSchema = new mongoose.Schema({
// //   customer: {
// //     name: String,
// //     phone: String,
// //     address: String
// //   },
// //   items: [{
// //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// //     name: String,
// //     price: Number,
// //     quantity: Number
// //   }],
// //   total: Number,
// //   upiTransactionId: String,
// //   status: { type: String, default: 'pending' }
// // }, { timestamps: true });

// // module.exports = mongoose.model('Order', orderSchema);
// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   name: String,
//   price: Number,
//   quantity: Number
// });

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: { type: String, required: true },
//     phone: String,
//     address: String,
//     email: String
//   },
//   items: [orderItemSchema],
//   totalAmount: { type: Number, required: true },
//   payment: {
//     method: String,
//     transactionId: String
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number,
  image: String
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: String,
    address: String
  },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  payment: {
    method: String,
    transactionId: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
