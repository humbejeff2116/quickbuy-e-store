








const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/users'});
const {body, check, validationResult } = require('express-validator');
const allProductsController = require('../../controller/allProductsController');
const productController = require('../controller/productController')
const userController = require('../controller/userController');
const adminSignUpValidation = require('../validations/adminSignupValidation');
const adminLoginvalidation = require('../validations/adminLoginvalidation');
const productsValidation = require('../validations/productsValidation');
const { multerUploads } = require('../../routes/Multer/multer');
let router = express.Router();
let ensureAuthenticated = require('../auth/routeAuth');





router.get('/', ensureAuthenticated, userController.getPanel)
router.get('/signup',userController.getSignup);
router.post('/signup',upload.single('profileimage'),adminSignUpValidation, userController.postSignup,
    passport.authenticate('local' , {
        successRedirect: '/admin/',
        failureRedirect:'/admin/signup',
        failureFlash: true
    })
);
router.get('/login', userController.getLogin);
router.post('/login',adminLoginvalidation, userController.validateLogin, passport.authenticate('local', {
    failureRedirect: '/admin/login',
    failureFlash: true,     
}), userController.postLogin );

router.get('/logout', userController.logOut);

router.post('/',multerUploads, productController.postProduct);
// router.post('/',multerUploads, userController.postProduct)

module.exports = router;