const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

const fetchUser = require('../middleware/authMiddleware');

router.post('/addToCart', fetchUser, cartController.addToCart);
router.post('/removeFromCart', fetchUser, cartController.removeFromCart);
router.get('/getCart', fetchUser, cartController.getCart);

module.exports = router;
