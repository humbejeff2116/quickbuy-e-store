
const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = (req, res, next) => {
    const JWT_SECRET = config.secret.jwtSecret;
    let token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    console.log('token is', token);
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