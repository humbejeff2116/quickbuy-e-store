










const express = require('express');
const multer = require('multer');
const upload1 = multer({dest :'public/uploads/users'});
const upload2 = multer({dest :'public/uploads/users'});
const {body, check, validationResult } = require('express-validator');
const productsController = require('../controller/allProductsController');
const seeAllControllers = require('../controller/seeAllControllers');
const usersController = require('../controller/usersController');
const subscriptionController = require('../controller/subscriptionController');
const jwtMiddleware = require('../Auth/jwtAuth');
const orderController = require('../controller/ordersContoller');


let router = express.Router();

const validation =[

    check('name').notEmpty().withMessage('Name field is required'),
    check('email').notEmpty().withMessage('email field is required'),
    check('email').isEmail().withMessage(' email field should contain a valid email'),
    check('phone').notEmpty().withMessage('phone number field is required'),
    check('password' ).notEmpty().withMessage('password field is required')
    .custom((value,{req})=>{
        if(value !== req.body.password2){
          throw new Error('password confirmation is incorrect')
        } 
        return value;
    }),
    check('password').isLength({ min: 5 }).withMessage( 'password should contain more than 4 characters' )
    // body('password2').isLength({ min: 5 }).withMessage(' password should be more than 5 chars')
]


router.get('/all-Products', productsController.getAllProducts);
router.post('/all-products',upload2.single('itemimage'),productsController.postAllProducts);
router.get(`/latest-deals`, seeAllControllers.getLatestDeals);
router.get('/women-collections', seeAllControllers.getWomenCollections);
router.get('/men-collections',seeAllControllers.getMenCollections);
router.get('/popular-collections', seeAllControllers.getPopularCollections);
router.get('/accessories',seeAllControllers.getAccessories);
router.get('/jewelries',seeAllControllers.getJewelries);
router.post('/users/signup',upload1.single('profileimage'),validation,usersController.signUp);
router.post('/subscription',subscriptionController.postSubscription);
router.post('/login',usersController.userLogin);
router.get('/pay', jwtMiddleware,usersController.userPay);
router.post('/cart', productsController.getCartProducts); 
router.post('/orders',jwtMiddleware, orderController.postOders);
router.get('/orders',jwtMiddleware, orderController.getOrders);


// work on route getAccesories and getJewelries


module.exports = router;