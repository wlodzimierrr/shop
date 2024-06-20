const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    email: { type: String, required: true },
    personalDetails: {type: Object},
    orderData: { type: Object },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Orders', ordersSchema);
