
const SubscriptionsModel = require('../models/subscriptionsModel');
// TODO... un comment code when ready to use email service functionality
// const config = require('../config/config');
// const emailService = require('../libs/mail')(config);
const { validationResult } = require('express-validator');

function Subscription() {
   this.postSubscription = async function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {      
         res.json({ status: 422, valErrors: errors.array() });
         return res.status(422);
      }
      let email = req.body.subemail;
      //  let tags = req.body.tags
      let tags = 'yeagh';   
      await SubscriptionsModel.update({email: email},{$push: {tags: tags}})
      .then(data => {
         const body = 'thank you for your supscription to quick buy service';
         // TODO... uncomment the code below when ready to use email service API
         //  emailService.send(email,'quickbuy products supscription',body)
         return res.status(201).json({status: 201, message: 'subscription successful'});
      })
      .catch(err => {
         console.error(err.stack);
         return res.status(400).json({status: 400, message: 'error processing your request please you can wait and try again'})
      })
   }
}
module.exports = new Subscription();