const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const fetchUser = require('../middleware/authMiddleware');

router.post('/addtocart', fetchUser, cartController.addToCart);
router.post('/removefromcart', fetchUser, cartController.removeFromCart);
router.post('/getcart', fetchUser, cartController.getCart);

module.exports = router;
