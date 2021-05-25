// Validates and decodes a token, passing the 
// values into the req

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json('Please supply a valid token')
            } else {
                req.decodedJwt = decoded;
                next();
            }
        })
    } else {
        return res.status(401).json("You must have a token to do that");
    }
    next();
}