var Order = require("../Model/orderModel")

var getAllOrders = async(req,res)=>{
    try{
        var userId = req.user.id 
        var allOrders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "User orders fetched successfully",
            orders: allOrders,
          });

    }catch(error){
        console.log("error",error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

var getSingleOrder = async(req,res)=>{
    try{
        var userId = req.user.id 
        var orderId = req.params.id 
        var order = await Order.findOne({
            _id: orderId,
            userId: userId, 
          });
          if (!order) {
            return res.status(404).json({
              message: "Order not found",
            });
            
          }

          res.status(200).json({
            message: "Order fetched successfully",
            order,
          });
      

    }catch(error){
        console.log("error",error);
    }
}


module.exports = {
    getAllOrders,getSingleOrder
}