require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CORS_ORIGIN: ['http://peakperformance.wlodzimierrr.co.uk', 'https://peakperformance.wlodzimierrr.co.uk', 'http://localhost:5252', 'http://172.18.0.2:4242'],
    RATE_LIMIT_WINDOW_MS: 1 * 60 * 1000, // 1 minute
    RATE_LIMIT_MAX: 100,
    }
