const jwt = require('jsonwebtoken')
const { JSONWEBSECRET } = require('../config')
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({});
    }

    const token = authHeader.split('')[1];
    try {
        const decode = jwt.verify(token, JSONWEBSECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(400).json({});
    }
}

module.exports = { authMiddleware }