
const ProductsModel = require('../models/productsModel');
const config = require('../config/config');
const { dataUri } = require('../routes/Multer/multer');






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
                const searchedProducts = products.map( product=>{
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
                })
                return res.status(200).json({ status: 200,message:`products returned ( ${products.length} )`, data: searchedProducts });
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
                '7':2,
                '8':3,
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