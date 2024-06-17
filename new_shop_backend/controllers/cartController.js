const UserModel = require('../models/User');
const UserModelInstance = new UserModel();

exports.addToCart = async (req, res) => {
    let userData = await UserModel.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await UserModel.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ message: "Added" });
};

exports.removeFromCart = async (req, res) => {
    try {
        let userData = await UserModel.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        await UserModel.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ message: "Removed" });
    } catch (error) {
        next(error);
    }
};

exports.getCart = async (req, res) => {
    try {
        let userData = await UserModel.findOne({ _id: req.user.id });
         res.json(userData.cartData);
    } catch (error) {
        next(error)
    }
};
