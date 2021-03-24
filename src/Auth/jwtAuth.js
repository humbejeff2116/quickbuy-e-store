
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials');

const JWT_SECRET = credentials.jwtSecret;

module.exports = (req, res, next) => {
    let token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(403).send({status:403, success: false,  message: 'Failed to authenticate token.' });
            } 
                req.decoded = decoded;
               next();
        });
    } else {
        return res.status(401).send({status:401, success: false, message: 'No token provided.'});
    }
};