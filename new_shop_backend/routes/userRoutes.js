const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const fetchUser = require('../middleware/authMiddleware');

router.get('/details', fetchUser, userController.getUserDetails);
router.put('/updateDetails', fetchUser, userController.updateDetails);

module.exports = router;