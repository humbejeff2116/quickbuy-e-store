
const express = require('express');
const multer = require('multer');
const upload1 = multer({dest: 'public/uploads/users'});
const uploadProduct = multer({dest: 'public/uploads/products'});
const {body, check, validationResult } = require('express-validator');
const signupValidation = require('../validation/signupValidation');
const loginValidation = require('../validation/loginValidation');
const subscriptionValidation  = require('../validation/subscriptionValidation');
const productsController = require('../controller/allProductsController');
const seeAllControllers = require('../controller/seeAllControllers');
const usersController = require('../controller/usersController');
const subscriptionController = require('../controller/subscriptionController');
const jwtMiddleware = require('../Auth/jwtAuth');
const orderController = require('../controller/ordersContoller');
let router = express.Router();


router.get('/all-Products', productsController.getAllProducts);
router.post('/all-products', uploadProduct.single('itemimage'), productsController.postAllProducts);
router.get(`/latest-deals`, seeAllControllers.getLatestDeals);
router.get('/women-collections', seeAllControllers.getWomenCollections);
router.get('/men-collections',seeAllControllers.getMenCollections);
router.get('/popular-collections', seeAllControllers.getPopularCollections);
router.get('/accessories', seeAllControllers.getAccessories);
router.get('/jewelries', seeAllControllers.getJewelries);
router.post('/users/signup', upload1.single('profileimage'), signupValidation, usersController.signUp);
router.post('/subscription', subscriptionValidation, subscriptionController.postSubscription);
router.get('/search', productsController.searchProduct);
router.post('/login', loginValidation, usersController.userLogin);
// router.get('/users/dashboard',jwtMiddleware, usersController.userDashboard);
router.get('/pay', jwtMiddleware,usersController.userPay);
router.post('/cart', productsController.getCartProducts); 
router.post('/orders', jwtMiddleware, orderController.postOders);
router.get('/orders', jwtMiddleware, orderController.getOrders);
router.post('/authenticate', jwtMiddleware,usersController.checkout);

module.exports = router;
