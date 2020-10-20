

















const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials');

const JWT_SECRET = credentials.jwtSecret;

module.exports = (req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(403).send({status:403, success: false,  message: 'Failed to authenticate token.' });
            } 
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
               next();
        });

    } else {
        // if there is no token, return an error
        return res.status(401).send({status:401, success: false, message: 'No token provided.'});
    }

};