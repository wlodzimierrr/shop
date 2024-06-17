const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    cartData: { type: Object },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
