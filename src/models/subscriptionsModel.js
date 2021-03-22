











const mongoose = require('mongoose');


const SubscriptionSchema = mongoose.Schema({
    email:{type:String , required:true},
    tags:[String]
});
const Subscription = mongoose.model('subscriptions',SubscriptionSchema);
module.exports = Subscription;