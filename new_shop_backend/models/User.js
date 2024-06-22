const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: [String], required: true },
    status: { type: String, required: true },
    cart: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
  });

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    personalDetails: {type: Object},
    cartData: { type: Object },
    ordersData: { type: [orderSchema], default: [] },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
