const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');

const fetchUser = require('../middleware/authMiddleware');

router.get('/publishableKey', ordersController.getPublishableKey);
router.post('/paymentIntent', ordersController.createPaymentIntent);
router.post('/saveOrder', fetchUser, ordersController.saveOrder);
router.post('/saveGuestOrder', ordersController.saveGuestOrder);
router.get('/getOrders', fetchUser, ordersController.getOrders);

module.exports = router;
