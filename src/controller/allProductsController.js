








// const { response } = require('express');

const ProductsModel = require('../models/productsModel')






function productsController(){

   this.getAllProducts = async function (req, res, next) {

       await ProductsModel.find({})
           .then(allProducts => {
               let products = allProducts.map(product => {
                   return {
                       id: product._id,
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
               return res.status(500).json({ status: 500, message: 'Error getting products from database' });

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
                return res.status(500).json({ status: 500, message: 'failed to save products to database' });
            });

    }
    // middleware to update a product
    this.updateProducts= async function (req, res, next) {

        let id = req.params.id;

        await ProductsModel.find({ _id: id })
            .then(product => {
                if (!product) {
                    return res.status(400).json({ status: 400, error: true, message: 'product not found' });
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
                ProductsModel.update({ _id: product._id }, { $set: { name, src, price, available, tags } })
                    .then(product => {
                        return res.status(201).json({ status: 201, message: 'product was updated sucessfully' });
                    })
                    .catch(err => {
                        console.error(err.stack);
                        return res.status(500).json({ error: true, message: 'Error updating product' });
                    });

            })
            .catch(err => {
                return res.status(500).json({ error: true, message: 'Error updating product' });
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
                    return res.status(400).json({ status: 400, message: 'no products found' });
                }
                return res.status(200).json({ status: 200, data: products });

            }).catch(err => {
                console.error(err.stack);
                return res.status(500).json({ error: true, message: 'failed to get products' });
            });

    }

    // middleware to get cart products
    this.getCartProducts = async function (req, res, next) {

        let cart = JSON.parse(req.body.cart);
        let product = [];

        if (!cart) {
            return res.status(400).json({ data: product, message: 'no items in cart' });

        }
        await ProductsModel.find({})
            .then(products => {
                const cartProducts = [];
                let id = null;
                for (let i = 0; i < products.length; i++) {
                    id = products[i]._id.toString();
                    //    check if cart has any of the data id           
                    if (cart.hasOwnProperty(id)) {
                        products[i].qty = cart[id];
                        cartProducts.push(products[i]);
                        return res.status(200).json({ data: cartProducts });
                    }

                }

            }).catch(err => {
                console.errror(err.stack);
                return res.status(500).json({ status: 500, message: 'failed to save data to database' });

            });

    }


}
module.exports = new productsController();


