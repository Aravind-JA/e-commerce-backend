const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.Admin_Key;

async function verifyAdminToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, key, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decode;
        next();
    });
}

module.exports = { verifyAdminToken };