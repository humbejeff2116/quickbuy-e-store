


const ProductsModel = require('../models/productsModel')




function productsController() {
   this.getAllProducts = async function (req, res, next) {
       try{
            await ProductsModel.find({})
            .then(allProducts => {
                let products = allProducts.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        src: product.src,
                        price: product.price,
                        available: product.available,
                        category: product.category,
                        description: product.description,
                        tags: product.tags
                    };
                });
                return res.status(200).json({ status: 200, data: products, message: 'retrieved app data succesfully' });
            })
            .catch(err => {
                console.error(err.stack);             
                res.json({ status: 500, message: 'An error occured while getting products from database' });
                return res.status(500);
            });

       }catch(err) {
        res.json({ status: 500, message: 'An error occured while getting products from database' });
        return res.status(500);
       }    
   }

    this.postAllProducts = async function (req, res, next) {
        try{
           
            let name = req.body.name;
            let src = (req.file) ? req.file.filename : 'noimage.jpg';
            let price = req.body.price;
            let available = req.body.available;
            let category = req.body.category;
            let description = req.body.description;
            let tags = req.body.tags;
            let product = new ProductsModel({
                name,
                src,
                price,
                available,
                category,
                description,
                tags
            });
            await product.save()
                .then(data => {
                    return res.status(201).json({ status: 201, message: 'product saved sucessfully' });
                })
                .catch(err => {
                    console.error(err.stack);              
                    res.json({ status: 500, message: 'An error occured while saving products to database' });
                    return res.status(500);
                });
        }catch(err) {
            res.json({ status: 500, message: 'An error occured while saving products to database' });
            return res.status(500);
        }   
    }
    this.updateProducts = async function (req, res, next) {
        try{
            let id = req.params.id;
            await ProductsModel.find({id: id})
                .then(product => {
                    if (!product) {        
                        res.json({ status: 400, error: true, message: 'product not found' });
                        return res.status(400);
                    }
                    let name = req.body.name || product.name;
                    let src = req.body.src || product.src;
                    let price = req.body.price || product.price;  
                    let reqAvailable = require('../libs/library').convertToBool(req.body.available);
                    let available = (typeof reqAvailable === 'boolean' && reqAvailable === false) ? reqAvailable : true;
                    console.log(available);
                    let tags = req.body.tags || product.tags;
                    // work on updating tags
                    ProductsModel.update({ id: product.id }, { $set: { name, src, price, available, tags } })
                        .then(product => {
                            return res.status(201).json({ status: 201, message: 'product was updated sucessfully' });
                        })
                        .catch(err => {
                            console.error(err.stack);
                            res.json({ error: true, message: 'An error occured while updating product' });
                            return res.status(500);
                        });
                })
                .catch(err => {    
                    res.json({ error: true, message: 'Error updating product' });
                    return res.status(500);
                });

        }catch(err) {
            res.json({ error: true, message: 'An error while updating product' });
            return res.status(500);
        }      
    }

    this.searchProduct = async function (req, res, next) {
        try{
            let text = req.query.q;
            console.log(text);
            await ProductsModel.find({ $text: { $search: text } })
            .then(products => {
                if (!products.length) {             
                    res.json({ status: 400, errMessage: 'no product matches your search' });
                    return res.status(400);
                }
                return res.status(200).json({ status: 200,message:`products returned ( ${products.length} )`, data: products });
            }).catch(err => {
                console.error(err.stack);
                res.json({ error: true, message: 'an error occured while getting products' });
                return res.status(500);
            });

        }catch(err) {
            console.error(err.stack);
            res.json({ error: true, message: 'an error occured while getting products' });
            return res.status(500);
        }       
    }
 
    this.getCartProducts = async function (req, res, next) {
        try{
            let cart = JSON.parse(req.body.cart);
            let cartProducts = [];
            let id = null;
            let cart1 ={
                '2':2,
                '3':3,
                '6':2
            }
            if (!cart) {
            res.json({ data: cartProducts, message: 'no items in cart' });
            return res.status(400);
            }
            const products = await ProductsModel.find();
               for(let i = 0; i < products.length; i++) {
                id = products[i].id; 
                if(cart1.hasOwnProperty(id)) {
                    cartProducts.push(products[i]);  
                } 
            }
            return res.status(200).json({satus:200, data: cartProducts });                                       
        }catch(err) {
            console.error(err.stack);
            res.json({ status: 500, message: 'an error occured while getting data from database' });
            return res.status(500);
        }
    }
}
module.exports = new productsController();