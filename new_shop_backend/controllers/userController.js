const UserModel = require('../models/User');

exports.getUserDetails = async (req, res, next) => {
    try {
        let userData = await UserModel.findOne({ _id: req.user.id }).select('-password');
        res.json({ success: true, userData });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateDetails = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, addressLine1, addressLine2, city, county, postcode } = req.body;

        let updatedDetails = {
            firstName,
            lastName,
            addressLine1,
            addressLine2,
            city,
            county,
            postcode,
        };

        const user = await UserModel.findByIdAndUpdate(userId, {
            $set: { personalDetails: updatedDetails },
        }, { new: true });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error updating details:", error);
        res.status(500).json({ success: false, message: "Could not update details" });
    }
};

