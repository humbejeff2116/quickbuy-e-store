





const cloudinary = require('cloudinary').v2;
const { dataUri } = require('../../routes/Multer/multer');
const ProductsModel = require('../../models/productsModel');

cloudinary.config({ 
    cloud_name:config.cloudinary.cloudName, 
    api_key: config.cloudinary.apiKey, 
    api_secret:config.cloudinary.secret 
});



function ProductController() {
    this.postProduct = async  (req, res, next) => {
      
            let name = req.body.productname;
            let imageSrc = (req.file) ? req.file.filename : 'no-image';
            let price = req.body.price;
            let available = req.body.available 
            let category = req.body.category;
            let description = req.body.description;
            let tagsString = req.body.tags;
            let tags = tagsString.split(',');
            let productSizeString = req.body.productsizes;

            let productSizeArray = productSizeString.split(',');
            let productSizes = productSizeArray.map((size,i) => {
                return {
                  size: size
                }     
            });
            console.log(name,price, available, category,description,tags, imageSrc,productSizes);
            // res.send(name)
            let product =await new ProductsModel({
                        name,
                        src:imageSrc,
                        price,
                        available,
                        category,
                        description,
                        tags,
                        productSizes
                       
                    });
                    console.log('product is', product);
                   await product.save()
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
}
module.exports = new ProductController();




 // await cloudinary.uploader.upload(imageSrc)
                // .then(image => {
                //     console.log('image is', image);
                //     console.log('image url is', imageUrl);
                //     let src = image.url;
                //     console.log('image url is', src);
                //     let product = new ProductsModel({
                //         name,
                //         src,
                //         price,
                //         available,
                //         category,
                //         description,
                //         tags,
                //         productSizes
                //     });
                //     console.log('product is', product);
                //     product.save()
                //     .then(data => {
                //         req.flash('product saved successfully');
                //         return res.status(201).json({ status: 201, message: 'product saved sucessfully' });
                //     })
                //     .catch(err => {
                //         console.error(err.stack); 
                //         req.flash('an error occured while saving product');             
                //         res.json({ status: 500, message: 'An error occured while saving product to database' });
                //         return res.status(500);
                //     });
                // })
                // .catch(err => { 
                //     console.error(err.stack);
                //     req.flash('Error occured while saving image');                   
                //     res.json({ message: 'Error occured while saving image'});
                //     return  res.status(400);
                // });