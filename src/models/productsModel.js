
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
});
const Counter = mongoose.model('counter', CounterSchema);

const ProductSchema =  mongoose.Schema({
    id: {type: String, unique: true},
    name: {type: String , required: true},
    src: {type: String},
    price: {type: String, required: true},
    available: {type: Boolean , required: true },
    category: {type: String, required: true},
    description: {type: String, required: true},
    thumbnails: [{type: String}],
    productSizes:[{type: Number}],
    tags: [String],
    createdAt: {type: Date, default: Date.now} 
});

ProductSchema.index({
    '$**':'text'
});


ProductSchema.pre('save', function(next) {
    let self = this;
    Counter.findByIdAndUpdate(
        {_id: "productId"}, 
        {$inc: {seq: 1}},
        {new: true, upsert: true},
        function(err, count) {
            if(err) return next(err);
            self.id = count.seq;
            next();
        })
})
 
const Product  = mongoose.model('products' , ProductSchema);
module.exports = Product;