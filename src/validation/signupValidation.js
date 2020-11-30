






const {body, check  } = require('express-validator');


const validation =[

    check('firstname').notEmpty().withMessage('firstname field is required'),
    check('lastname').notEmpty().withMessage('lastname field is required'),
    check('email').notEmpty().withMessage('email field is required'),
    check('email').isEmail().withMessage(' email field should contain a valid email'),
    check('phonenumber').isMobilePhone().withMessage('phone number field is required'),
    check('password' ).notEmpty().withMessage('password field is required')
    .custom((value,{req})=>{
        if(!value){
            throw new Error('password field is empty');
        }
        if(value !== req.body.password2){
          throw new Error('password confirmation is incorrect');
        } 
      
        return value;
    }),
    check('password').isLength({ min: 4 }).withMessage( 'password should contain at least 4 characters' )
    // body('password2').isLength({ min: 5 }).withMessage(' password should be more than 5 chars')
]
module.exports = validation; 
