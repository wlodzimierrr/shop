require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));


module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET_SECRET
    }