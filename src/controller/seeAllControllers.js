


const ProductsModel = require('../models/productsModel')

class SeeAllController {
 
    getLatestDeals = async (req, res, next) => {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        await  ProductsModel.find({tags:"latest deals"})
        .sort({createdate: 'descending'})
        .skip(skip)
        .limit(limit)
        .then(latestDeals => {          
            let products = latestDeals.map(product => {
                return{
                    id:product.id,
                    name:product.name,
                    src:product.src,
                    price:product.price,
                    available:product.available,
                    category: product.category,
                    description :product.description,
                    tags:product.tags,
                }               
            });
           return res.status(200).json({status: 200, data: products, message: 'retrieved app data succesfully' });
        })
        .catch(err => {
            console.error(err.stack);
            return res.status(500).json({status: 500,message:'failed to get latest deals products'});
        });
    }

    getWomenCollections = async (req, res, next) => {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        await  ProductsModel.find({tags : "women collections"})
        .sort({createdate : 'descending'})
        .skip(skip)
        .limit(limit)
        .then(womenCollections => {
            let products = womenCollections.map(product => {
                return{
                    id:product.id,
                    name:product.name,
                    src:product.src,
                    price:product.price,
                    available:product.available,
                    category: product.category,
                    description :product.description,
                    tags:product.tags,
                }               
            });
           return res.status(200).json({status: 200, data: products, message: 'retrieved app data succesfully' });
        })
        .catch( err => {
            console.error(err.stack);
            return res.status(500).json({status: 500,message:'failed to get latest deals products'});
        });
    }

    getMenCollections = async (req, res, next) => {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);     
        await  ProductsModel.find({tags :"men collections"})
        .sort({createdate : 'descending'})
        .skip(skip)
        .limit(limit)
        .then(menCollections => {
            let products = menCollections.map(product => {
                return{
                    id:product.id,
                    name:product.name,
                    src:product.src,
                    price:product.price,
                    available:product.available,
                    category: product.category,
                    description :product.description,
                    tags:product.tags,
                }               
            });
            return res.status(200).json({status: 200, data: products, message: 'retrieved app data succesfully' });
        })
        .catch( err => {
            console.error(err.stack);
            return res.status(500).json({status: 500,message:'failed to get latest deals products'});
        });
    }

    getPopularCollections = async (req, res, next) => {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        await  ProductsModel.find({tags :"popular collections"})
            .sort({createdate : 'descending'})
            .skip(skip)
            .limit(limit)
            .then(popularCollections => {
                let products = popularCollections.map(product => {
                    return{
                        id:product.id,
                        name:product.name,
                        src:product.src,
                        price:product.price,
                        available:product.available,
                        category: product.category,
                        description :product.description,
                        tags:product.tags,
                    }   
                });
               return res.status(200).json({status: 200, data: products, message: 'retrieved app data succesfully' });
            })
            .catch( err => {
                console.error(err.stack);
                return res.status(500).json({status: 500,message:'failed to get popular collections products'});
            });       
    }

    getAccessories = async (req, res, next) => {  
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        await  ProductsModel.find({tags :"accessories"})
        .sort({createdate : 'descending'})
        .skip(skip)
        .limit(limit)
        .then(accessories => {   
            let products = accessories.map(product => {
                return{
                    id:product.id,
                    name:product.name,
                    src:product.src,
                    price:product.price,
                    available:product.available,
                    category: product.category,
                    description :product.description,
                    tags:product.tags,
                }               
            });
           return res.status(200).json({status: 200, data: products, message: 'retrieved app data succesfully' });
        })
        .catch( err => {
            console.error(err.stack);
            return res.status(500).json({status: 500,message:'failed to get accessories products data'});
        });
    }

    getJewelries = async (req, res, next)  => {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        await  ProductsModel.find({tags : "jewelries"})
        .sort({createdate: 'descending'})
        .skip(skip)
        .limit(limit)
        .then(jewelries => {         
            let products = jewelries.map(product => {
                return{
                    id:product.id,
                    name:product.name,
                    src:product.src,
                    price:product.price,
                    available:product.available,
                    category: product.category,
                    description :product.description,
                    tags:product.tags,
                }               
            });
           return res.status(200).json({status: 200, data: products, message: 'retrieved app data succesfully' });
        })
        .catch( err => {
            console.error(err.stack);
            return res.status(500).json({status: 500,message:'failed to get jewelries data'});
        });
    }
}
module.exports = new SeeAllController()