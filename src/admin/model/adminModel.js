









let mongoose = require('mongoose');
let bcrypt = require('bcryptjs')



let AdminSchema = mongoose.Schema({
    fullname:{type: String , required:true},
    username:{type: String, required: true, unique: true},
    password:{type: String , required: true },  
    profileimage:{type: String},
    createdate:{ type:Date , default: Date.now},
});


AdminSchema.pre('save' , function (next) {
    let self = this;
  
    if (!self.isModified("password")) {
        return next();

    }
    bcrypt.genSalt(10, function(err,salt) {
        if (err) {
            return next(err)
        }
      
        bcrypt.hash(self.password, salt,function(err, hashedpassword) {
                if (err) {
                    return next(err);

                }
               self.password = hashedpassword;
                next();
        });
    });
});

AdminSchema.methods.checkPassword = function(guess,done) {
    bcrypt.compare(guess, this.password, function(err,isMatch) {
        done(err, isMatch);
    });
};


AdminSchema.methods.displayName = function() {
    return  this.fullname
} 

const  Admin  = mongoose.model('Admin' , AdminSchema)
module.exports = Admin
