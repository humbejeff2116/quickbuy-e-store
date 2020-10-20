











const mongoose = require('mongoose');


const SubscriptionsSchema = mongoose.Schema({
    email:{type:String , required:true},
    tags:[String]

});
const Subscription = mongoose.model('subscriptions',SubscriptionsSchema);
module.exports = Subscription;