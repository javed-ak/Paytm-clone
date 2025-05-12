const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(411).json({
            message: 'You are unauthenticated'
        });
    };

    const token = authHeader.split(" ")[1];
    try {
        const validate = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = validate.userId;
        next();
    } catch (e) {
        return res.status(411).json({
            message: 'User is not authenticated'
        });
    };
};

module.exports = {
    authMiddleware
};