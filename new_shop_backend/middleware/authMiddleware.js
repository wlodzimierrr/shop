const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); 
        req.user = data.user;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).send({ errors: "Invalid token" });
    }
};

module.exports = fetchUser;
