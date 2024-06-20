const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserModel = require('../models/User');

const { JWT_SECRET } = require('../config')

exports.signup = async (req, res, next) => {
    try {
        const check = await UserModel.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const details = {
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            AddressLine1: req.body.addressLine1,
            AddressLine2: req.body.addressLine2,
            City: req.body.city,
            County: req.body.county,
            Postcode: req.body.postcode
        };

        const cart = {};
        for (let i = 1; i <= 300; i++) {
            cart[i] = 0;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new UserModel({
            name: req.body.username,
            email: req.body.email,
            personalDetails: details,
            password: hashedPassword,
            cartData: cart,
            orderData: [],
        });

        await user.save();
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, JWT_SECRET);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Wrong Email Address" });
        }

        const passMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passMatch) {
            return res.status(401).json({ success: false, message: "Wrong Password" });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userData = await UserModel.findById(userId);
  
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const { oldPassword, newPassword } = req.body;
        const passMatch = await bcrypt.compare(oldPassword, userData.password);
  
        if (!passMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect old password.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
  
        await UserModel.findOneAndUpdate({ _id: userId }, { password: hashedPassword });

        res.json({ success: true, message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  };