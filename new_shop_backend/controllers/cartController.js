const UserModel = require('../models/User');

exports.addToCart = async (req, res, next) => {
    try {
        let userData = await UserModel.findById(req.user.id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userData.cartData.hasOwnProperty(req.body.itemId)) {
            userData.cartData[req.body.itemId] += 1;
        } else {
            userData.cartData[req.body.itemId] = 1;
        }

        await UserModel.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
        res.json({ success: true, message: "Added" });
    } catch (error) {
        console.error('Add to Cart Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        let userData = await UserModel.findById(req.user.id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (userData.cartData.hasOwnProperty(req.body.itemId) && userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await UserModel.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
            return res.json({ success: true, message: "Removed" });
        } else {
            return res.status(400).json({ success: false, message: "Item not in cart or quantity is zero" });
        }
    } catch (error) {
        console.error('Remove from Cart Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.user.id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

