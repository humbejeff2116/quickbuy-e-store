
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').Extractjwt;
const credentails = require('../config/credentials');


module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secret = credentails.pssrptJwtSecret;
    // beleive these should be optional
    opts.issuer = 'accounts.example.com';
    opts.audience = 'yoursite.net';
     passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
        await User.findOne({ _id: jwt_payload.id})
        .then(user => {
            if(user) {
                return done(null, user);
            }
            return done(null, false)
        })
        .catch(err => {
            console.error(err.stack);
            return done(err,false)
        });          
    }));   
}