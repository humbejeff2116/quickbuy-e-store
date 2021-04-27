








const {body, check,  } = require('express-validator');




const validation =  [
    check('fullname').notEmpty().withMessage('fullname field is required'),
    check('username').notEmpty().withMessage('username field is required'),
    check('password' ).notEmpty().withMessage('password field is required')
    .custom((value, {req})=> {
        if(!value) {
            throw new Error('password field is empty');
        }
        if(value !== req.body.password2) {
          throw new Error('password confirmation is incorrect');
        }   
        return value;
    }),
    check('password').isLength({ min: 5 }).withMessage(' password should contain more than 4 characters'),
]
module.exports = validation; 