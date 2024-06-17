const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserModel = require('../models/User');
const ProductModel = require('../models/Product');

const { JWT_SECRET } = require('../config')

exports.signup = async (req, res, next) => {
    try {
        let products = await ProductModel.find({});
        let check = await UserModel.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({
                success: false,
                errors: "Email already registered",
            });
        }
        let cart = {};
        for (let i = 0; i < products.length + 1; i++) {
            cart[i] = 0;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res, next) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            const passMatch = await bcrypt.compare(req.body.password, user.password);
            if (passMatch) {
                const data = { user: { id: user.id } };
                const token = jwt.sign(data, JWT_SECRET);
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
