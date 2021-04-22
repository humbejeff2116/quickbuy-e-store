
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/usersModel');
const config = require('../config/config');

function UserController() {
  this.signUp = async (req, res, next) => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ status: 422, valErrors: errors.array() });
        return res.status(422);  
      }
      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      let email = req.body.email;
      let phonenumber = req.body.phonenumber;
      let password = req.body.password;  
      let profileimage = (req.file) ? req.file.filename: 'noimage.jpg';
      const user =  await  User.findOne({email:email} );           
      if (user) {
        res.json({status:400, message:' Email has already been registered on this site'});
        return res.status(400);
      }
      let newUser =  new User ({
        firstname,
        lastname,
        email,
        phonenumber,
        password,
        profileimage
      });
      newUser.save();
      const userDetails = {
        firstname,
        lastname,
        profileimage
      }
      let token_payload = {firstname, phonenumber};
      let token = jwt.sign(token_payload, config.secret.jwtSecret , { expiresIn: '1h' });
      let response = {status:200, data : userDetails, error : false, message : 'you are now registered', token: token };
      return res.status(200).json(response); 
    }catch(err) {
      console.error(err);
      return res.status(400).json({status:400, message:'an error occured while registering please try again'});
    }
  }

  this.userLogin = async (req, res, next) => {   
    try{
      const errors = validationResult(req);  
      if (!errors.isEmpty()) {              
        res.json({ status: 422, valErrors: errors.array() });
        return res.status(422);
      }
      const email = req.body.email;
      const phonenumber = typeof email === 'number'? parseInt(email):null;
      const password = req.body.password;
      const user =  await  User.findOne({"email":email });
      if (!user) {
        console.error('no user found'); 
        res.json({status:401, message: 'Incorrect email Address' });
        return res.status(401);                           
      }          
      user.checkPassword(password, function(err,isMatch) {
        if (err) {
          console.error('error while checking password');                  
          res.json({status:401,error:true,message:'an error occured while getting details'});
          return res.status(401);
        }
        if (!isMatch) {
          console.error('no match found');                  
          res.json( {status:401,error:true, message: 'Incorrect password.' });
          return res.status(401);           
        }
        let userDetails = {
          id:user._id,
          firstname:user.firstname,
          lastname:user.lastname,
          email:user.email,
          profileimage:user.profileimage
        }           
        let token_payload = {name: user.name, id: user._id};
        const token = jwt.sign(token_payload,config.secret.jwtSecret , { expiresIn: '1h' });
        let response = {status:200,data:userDetails,error:false, message: 'Token Created, Authentication Successful!', token: token };
        return res.status(200).json(response);           
      });
    }catch(err) {
    console.error(err);
    } 
  }

  this.checkout = (req, res, next) => {
    return res.status(200).json({status:200, error:false, message:'token authenticated successfully'})
  }

  this.userPay = (req,res,next) => {         
    return res.json("Payment Successful!");
  }
}
module.exports = new UserController();