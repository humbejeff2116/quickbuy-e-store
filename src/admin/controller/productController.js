





const cloudinary = require('cloudinary').v2;
const { dataUri } = require('../../routes/Multer/multer');
const config = require('../../config/config');
const ProductsModel = require('../../models/productsModel');





function ProductController() {
    this.postProduct = async  (req, res, next) => {
        let name = req.body.productname;
        let imageSrc = (req.file) ? dataUri(req).content : 'no-image';
        let price = req.body.price;
        let available = req.body.available 
        let category = req.body.category;
        let description = req.body.description;
        let tagsString = req.body.tags;
        let tags = tagsString.split(',').map(tag => tag.trim());
        let productSizeString = req.body.productsizes;
        let productSizes = productSizeString.split(',').map(size =>({size: size}));     
        cloudinary.config({ 
            cloud_name:config.cloudinary.cloudName, 
            api_key: config.cloudinary.apiKey, 
            api_secret:config.cloudinary.secret 
        });
        await cloudinary.uploader.upload(imageSrc)
        .then(image => {
            let src = image.url;
            let product = new ProductsModel({
                name,
                src,
                price,
                available,
                category,
                description,
                tags,
                productSizes  
            });
            product.save()
            .then(data => {
                req.flash('product saved successfully');
                res.status(201).json({ status: 201, message: 'product saved sucessfully' });
            })
            .catch(err => {
                console.error(err.stack); 
                req.flash('an error occured while saving product');             
                res.json({ status: 500, message: 'An error occured while saving product to database' });
                res.status(500);
            });
        })
        .catch(err => { 
            console.error(err.stack);
            req.flash('Error occured while saving image');                   
            res.json({ message: 'Error occured while saving image'});
            return  res.status(400);
        });    
    }

    this.updateProducts = async  (req, res, next) => {
        try{
            let id = req.params.id;
            await ProductsModel.find({id: id})
                .then(product => {
                    if (!product) {        
                        res.json({ status: 400, error: true, message: 'product not found' });
                        return res.status(400);
                    }

                    let name = req.body.productname || product.name;
                    let imageSrc = (req.file) ? dataUri(req).content : product.src;
                    let price = req.body.price || product.price; 
                    let available = req.body.available 
                    let category = req.body.category;
                    let description = req.body.description;
                    let productSizeString = req.body.productsizes;
                    let productSizeArray =(productSizeString) ? productSizeString.split(',') : [];
                    let productSizes = (productSizeArray.length > 0) ? productSizeArray.map((size,i) => {
                        return {
                            size: size
                        }     
                    }) : product.productSizes;
                    let tagsString = req.body.tags;
                    let tags = (tagsString) ? tagsString.split(',') : product.tags;;     
                    //TODO... work on updating tags
                    ProductsModel.update(
                        { id: product.id }, 
                        { 
                            $set: { 
                                name, 
                                src: imageSrc, 
                                price, 
                                available, 
                                category,
                                description,
                                productSizes, 
                                tags 
                            }
                        }
                    )
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
}
module.exports = new ProductController();