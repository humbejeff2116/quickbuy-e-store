



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/adminModel');




module.exports = function(){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
      passport.deserializeUser(function(id, done) {
       Admin.findById(id, function(err, user) {
          done(err, user);
        });
      });

    passport.use(new LocalStrategy(
      function(username, password, done) {

       Admin.findOne({ username: username }, function (err, user) {

        if (err) { 

          return done(err); 

        }

        if (!user) {

          return done(null, false, { message: 'Incorrect email Address' });

        }

        user.checkPassword(password,function(err,isMatch) {

            if(err){

                return done(err);

            }
            if(!isMatch){

                return done(null, false, { message: 'Password is incorrect.' });

            }

            return done(null, user);
        
         });
    
      });
  }));

}