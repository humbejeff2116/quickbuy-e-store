












const SubscriptionsModel = require('../models/subscriptionsModel');
class Subscription{

     // subscription form ont footer
  async postSubscription(req,res,next){
    let email = req.body.email;
    let tags = req.body.tags
    
    await SubscriptionsModel.update({email:email},{$push:{tags:tags}})
    .then(data=>{
       return res.status(201).json({status:201, message:'subscription sucessful'})

    })
    .catch(err=>{
        console.error(err.stack);
       return res.status(400).json({status:400, message:'error processing your request please you can wait and try again'})

    })

 }

}
module.exports = new Subscription()
 


