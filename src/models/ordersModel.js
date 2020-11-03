









const moongose = require("mongoose");

const oderSchema = moongose.Schema({

    orderId:{type:String, unique:true},
    userId:{type:String , },
    oderedProducts:[Object],
    quantity:{type:String},
    createdAt:{ type:Date , default: Date.now}, 
    modifiedAt:{type:Date, default:Date.now},
    totalAmount:{type:String}

})

const Oder = moongose.model('oders', oderSchema);
module.exports = Oder;