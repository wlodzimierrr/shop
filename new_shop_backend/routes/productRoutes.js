const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/addproduct', productController.addProduct);
router.post('/deleteproduct', productController.deleteProduct);
router.get('/allProducts', productController.getAllProducts);
router.get('/newCollection', productController.getNewCollection);
router.get('/popularProducts', productController.getPopularProducts);

module.exports = router;
