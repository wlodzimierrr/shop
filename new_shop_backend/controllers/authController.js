const jwt = require("jsonwebtoken");
const UserModel = require('../models/User');
const UserModelInstance = new UserModel()

exports.signup = async (req, res) => {
    try {
        let check = await UserModel.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({
                success: false,
                errors: "Email already registered",
            });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = UserModelInstance({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            const passMatch = req.body.password === user.password;
            if (passMatch) {
                const data = { user: { id: user.id } };
                const token = jwt.sign(data, process.env.JWT_SECRET);
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Wrong Password" });
            }
        } else {
            res.json({ success: false, errors: "Wrong Email Address" });
        }
    } catch (error) {
        next(error)
     }
};
