const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    old_price: { type: Number, required: true },
    new_price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productSchema);