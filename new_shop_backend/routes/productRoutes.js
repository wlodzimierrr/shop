const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/addProduct', productController.addProduct);
router.post('/deleteProduct', productController.deleteProduct);
router.get('/allProducts', productController.getAllProducts);
router.get('/newCollection', productController.getNewCollection);
router.get('/popularProducts', productController.getPopularProducts);

module.exports = router;
