




let Admin = require('../model/adminModel');

const { validationResult } = require('express-validator');

function UserController() {
    this.getPanel=  (req,res,next) => {  
       res.render('adminpanel')   
    }
    this.getLogin = (req, res) => {
       return res.render('login' ,{title:'login'})
    }
    this.validateLogin = (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).render('login', { valErrors: errors.array(), title: 'login'});
        }
       return next() 

    }
    this.postLogin = (req, res, next) => {
        req.flash('info', 'you are now logged in')
        return res.redirect('/admin/');
    }
    this.logOut = (req, res) => {
        req.logout();     
        req.flash('info'  , 'you are now loged out');
        res.redirect('/admin/login');
    }
    this.getSignup = (req, res) => {
       return res.render('signup',{title:'signup'})
    }
    this.postSignup = async (req, res, next) => {
        const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(422).render('signup', { valErrors: errors.array(), title: 'signup'});
          }   
        let fullname = req.body.fullname ;
        let username = req.body.username;
        let password = req.body.password;      
        let profileimage = (req.file) ? req.file.filename: 'noimage.jpg';
           await Admin.findOne({username: username} , function(err, user) {

                if (err) {
                    return next(err);
                }
    
                if (user) {
                    req.flash('error', 'email has already been registered on this site');
                    res.location('/admin/signup');
                    return res.redirect('/admin/signup');
                }   
                let newUser = new Admin ({
                    fullname:fullname,
                    username:username,            
                    password:password,
                    profileimage:profileimage
                });
             
                newUser.save(next);
                req.flash('info' , 'you are now registered'); 
                console.log(newUser);            
            });
    }

    this.postProduct = async (req, res, next) => {
        
      
        let name = req.body.productname;
        let price = req.body.price;
    
        console.log(name );
        res.json({name})
       
        
     
}
}
module.exports = new UserController();