const UserModel = require('../models/User');

exports.addToCart = async (req, res, next) => {
    try{
        let userData = await UserModel.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await UserModel.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ message: "Added" });
    } catch (error) {
        throw error;
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        let userData = await UserModel.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        await UserModel.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ message: "Removed" });
    } catch (error) {
        throw error;
    }
};

exports.getCart = async (req, res) => {
    try {
        let userData = await UserModel.findOne({ _id: req.user.id });
         res.json(userData.cartData);
    } catch (error) {
        throw error;
    }
};
