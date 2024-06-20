const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const { PORT } = require('./config');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes')
const userRoutes = require('./routes/userRoutes')

// Custom error handler
const errorHandler = require('./middleware/errorHandlingMiddleware')
app.use(errorHandler);

// Image storage engine
const upload = require('./utility/multer');
app.use('/images', express.static('uploads/images'));
app.post('/api/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
    });
});

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
