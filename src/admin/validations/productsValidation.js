





const {body, check,  } = require('express-validator');



const validation =  [
    check('productname').notEmpty().withMessage('name field is required'),
    check('price').notEmpty().withMessage('price field is required')
]
module.exports = validation;

