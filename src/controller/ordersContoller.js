
const OrderModel = require("../models/ordersModel");


function OrderController() {
    this.postOders = async (req, res, next) => {
        try{
            let payment = req.body.payment;
            let user = JSON.parse(req.body.user);       
            let products = req.body.products;
            let total = req.body.total;
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
            .then(data => {
               return res.status(201).json({status: 202, message: 'order have been placed successfully'});
            })
            .catch(err => {
                console.error(err.stack);
                return res.status(500).json({status: 500, message: 'an error occured while saving order'});
            })

        }catch(err) {
            console.error(err.stack);
            return res.status(500).json({status: 500, message: 'an error occured while saving order'});
        }
    }
     
    this.getOrders = async (req, res, next) => {
        let user = JSON.parse(req.body.user);
        const userId = user.id;
      let orders = await OrderModel.find({userId: userId});
      if(!orders) {
         return  res.status(400).json({status: 400, message: 'order not found'})
      }
      return res.status(200).json({status: 200, data: orders, message: ' Orders retrieved successfully'});
    }
}

module.exports = new OrderController();