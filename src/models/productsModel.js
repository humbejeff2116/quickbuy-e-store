








const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;



const ProductsSchema =  mongoose.Schema({

    id:{type: String, unique:true},
    name:{type: String , required:true},
    src:{type: String},
    price:{type: String, required: true},
    available:{type: Boolean , required: true },
    category:{type:String, required:true},
    description:{type:String, required:true},
    tags:[String],
    createdAt:{ type:Date , default: Date.now} 

});
ProductsSchema.index({
    '$**':'text'

})


const Product  = mongoose.model('products' , ProductsSchema)
module.exports = Product;


