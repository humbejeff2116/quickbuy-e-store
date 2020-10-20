







const jwt = require('jsonwebtoken');
const credentails = require('../config/credentials')



 const User = require('../models/usersModel')

class UserController{
    // signup route
    signUp = async (req,res,next)=>{
        
    const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(422).json({ status: 422, valErrors: errors.array() });
      }

    let firstname = req.body.firstname ;
    let lastname = req.body.lastname ;
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;  
    let profileimage = (req.file) ? req.file.filename: 'noimage.jpg';
    console.log(req.file);

 
      await  User.findOne({email:email} )
        .then(user=>{
            if(user){
               return res.status(400).json({status:400, message:' Email has already been registered on this site'})
            }
            new User ({
                firstname,
                lastname,
                email,
                phonenumber,
                password,
                profileimage
            })
            .save()
           const userDetails = {
              firstname,
              lastname,
              profileimage
          }

            let token_payload = {firstname, phonenumber};
            let token = jwt.sign(token_payload, credentails.jwtSecret , { expiresIn: '2h' });
            let response = {status:200, data : userDetails, error : false, message : 'you are now registered', token: token };
            return res.status(200).json(response);                
        })
        .catch(err=>{
            console.error(err.stack);
            return res.status(400).json({status:400, message:'an error occured while registering please try again'})
        })
  
    }
    // login route
    userLogin = async (req,res,next) => {
        let email = req.body.email;
        const password = req.body.password
        let phonenumber = req.body.phonenumber;

      //  await models.usersModel.findOne({email:email})
     await  User.find({
         "$or":[
           {"email":email },
           { "phoneNum":{"$gte":phonenumber } }
        ]
        })
        .then( user => {
            if (!user) {
                return res.status(401).json({status:401, message: 'Incorrect username or phone number.' });
            }
              user.checkPassword(password, function(err,isMatch) {
                if(err){
                    return res.status(400).json({status:400,error:true,message:'an error occured while getting details'});
                }
                if(!isMatch){
                    return res.status(401).json( {status:401,error:true, message: 'Incorrect password.' });
        
                }
                let userDetails = {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    profileimage:user.profileimage
                }

                let token_payload = {name: user.name, id: user._id};
                const token = jwt.sign(token_payload, credentails.jwtSecret , { expiresIn: '2h' });
                let response = {status:200,data:userDetails,error:false, message: 'Token Created, Authentication Successful!', token: token };
                return res.status(200).json(response);           
            });     
        })
        .catch(err=>{
            console.error(err.stack)
            return res.status(400).json(({status:400,error:true, message:'error occured while trying to get your information please try again'}))
        });
      
     
      
      }
    //   work on your integrate paypal here
    // the checkout route

      userPay = (req,res,next)=>{

            
        return res.json("Payment Successful!");

      }

}
module.exports = new UserController();








    

