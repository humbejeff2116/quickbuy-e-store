









const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');





const UserSchema =  mongoose.Schema({

    name:{type: String , required:true},
    email:{type: String, required: true, unique: true},
    password:{type: String , required: true, },
    createdAt:{ type:Date , default: Date.now},
    displayname:{type: String},
    bio:{type: String},
    profileimage:{type: String}
});

UserSchema.pre('save' , function (next){
    let user = this;
  
    if(!user.isModified("password")){
        return next();

    }
    bcrypt.genSalt(10, function(err,salt){
        if(err){
            return next(err)
        }
      
        bcrypt.hash(user.password, salt,function(err, hashedpassword){
                if(err){
                    return next(err);

                }
                user.password = hashedpassword;
                next();
            });
    });
});

UserSchema.methods.checkPassword = function(guess,done){
    bcrypt.compare(guess, this.password, function(err,isMatch){
        done(err, isMatch);
    });

};




UserSchema.methods.displayName = function() {
    return this.displayname || this.name;
} 

const User = mongoose.model('users',UserSchema );
module.exports = User;