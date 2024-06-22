const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const fetchUser = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/changePassword', fetchUser, authController.changePassword)

module.exports = router;
