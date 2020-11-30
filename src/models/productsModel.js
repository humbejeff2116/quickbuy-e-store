








const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;



const ProductSchema =  mongoose.Schema({

    id:{type: Number, unique:true},
    name:{type: String , required:true},
    src:{type: String},
    price:{type: String, required: true},
    available:{type: Boolean , required: true },
    category:{type:String, required:true},
    description:{type:String, required:true},
    tags:[String],
    createdAt:{ type:Date , default: Date.now} 

});
ProductSchema.index({
    '$**':'text'

})
 


const Product  = mongoose.model('products' , ProductSchema)
module.exports = Product;


