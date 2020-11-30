








// const { response } = require('express');

const ProductsModel = require('../models/productsModel')






function productsController(){

   this.getAllProducts = async function (req, res, next) {

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
             
               res.json({ status: 500, message: 'Error getting products from database' });
               return res.status(500);

           });

   }

    this.postAllProducts = async function (req, res, next) {
        let id = req.body.id;
        let name = req.body.name;
        let src = (req.file) ? req.file.filename : 'noimage.jpg';
        let price = req.body.price;
        let available = req.body.available;
        let category = req.body.category;
        let description = req.body.description;
        let tags = req.body.tags;

        let product = new ProductsModel({
            id,
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
              
                res.json({ status: 500, message: 'failed to save products to database' });
                return res.status(500);
            });

    }
    // middleware to update a product
    this.updateProducts = async function (req, res, next) {

        let id = req.params.id;

        await ProductsModel.find({ id: id })
            .then(product => {
                if (!product) {
                  
                    res.json({ status: 400, error: true, message: 'product not found' });
                    return res.status(400);
                }

                let name = req.body.name || product.name;
                let src = req.body.src || product.src;
                let price = req.body.price || product.price;
                // need to convert the req.body.available string to boolean    
                let reqAvailable = require('../libs/library').convertToBool(req.body.available);
                let available = (typeof reqAvailable === 'boolean' && reqAvailable === false) ? reqAvailable : true;
                console.log(available);
                // let available = req.body.available || product.available;
                let tags = req.body.tags || product.tags;
                // work on updating tags
                ProductsModel.update({ id: product.id }, { $set: { name, src, price, available, tags } })
                    .then(product => {
                        return res.status(201).json({ status: 201, message: 'product was updated sucessfully' });
                    })
                    .catch(err => {
                        console.error(err.stack);

                        res.json({ error: true, message: 'Error updating product' });
                        return res.status(500);
                    });

            })
            .catch(err => {
               
                res.json({ error: true, message: 'Error updating product' });
                return res.status(500);
            });

    }

    // search products work on it
    this.searchProduct = async function (req, res, next) {
        let query = req.body.query;
        await ProductsModel.find({ $text: { $search: query } })
            .limit(20)
            .skip(10)
            .then(products => {
                if (!products) {
                   
                    res.json({ status: 400, message: 'no products found' });
                    return res.status(400);
                }
                return res.status(200).json({ status: 200, data: products });

            }).catch(err => {
                console.error(err.stack);
              
                res.json({ error: true, message: 'failed to get products' });
                return res.status(500);
            });

    }

    // middleware to get cart products
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
           
            res.json({ data: product, message: 'no items in cart' });
            return res.status(400);

            }
            
            const products = await ProductsModel.find();
            
               for( let i = 0; i < products.length; i++ ) {
                id = products[i].id;
              
                if(cart1.hasOwnProperty(id)){
           
                    cartProducts.push(products[i]);
                 
                }
              
            }
            
            return res.status(200).json({satus:200, data: cartProducts });
                          
               
           }catch(err){
            console.error(err.stack);
            return res.status(500).json({ status: 500, message: 'failed to save data to database' });

        }

        

    }


}
module.exports = new productsController();


