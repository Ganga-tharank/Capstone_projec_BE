const jwt = require('jsonwebtoken');

function createAccessToken(payload) {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('SECRET_KEY environment variable is not set');
    }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

module.exports = { createAccessToken };
