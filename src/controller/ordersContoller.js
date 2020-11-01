










const OrderModel = require("../models/ordersModel");








class OrderController{

    postOders = async (req,res,next) => {
        // parameters sent from the frontend service
        let payment = req.body.order.payment;
        let user = JSON.parse(req.body.order.user);       
        let products = req.body.order.products;
        let total = req.body.order.total;

        let orderId =payment.payerID;
        let userId = user.id;
        let oderedProducts = products;
        let totalAmount = total;

        let order = new OrderModel ({
            orderId,
            userId,
            oderedProducts,
            totalAmount           
        });

        await order.save()
        .then(data=>{
           return res.status(201).json({status:202, message:'order have been placed successfully'});

        })
        .catch(err=>{
            console.error(err.stack);
            return res.status(500).json({status:500, message:'an error occured while saving order'});

        })
    }
    
    getOrders = async (req,res,next)=>{
        let user = JSON.parse(req.user)
        let userId = user.id;
      let orders = await  OrderModel.find({_id:userId});
      if(!orders){
         return  res.status(400).json({status:400, message:'order not found'})
      }
      return res.status(200).json({status:200, data:orders, message:' Orders retrieved successfully'});
    }

}

module.exports= new OrderController();