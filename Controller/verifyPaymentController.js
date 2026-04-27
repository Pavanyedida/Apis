var crypto = require("crypto")
var Product = require("../Model/ProductModel")
var Cart = require("../Model/cartModel")
var Order = require("../Model/orderModel")

function getUserIdFromReq(req) {
    return req.user && (req.user.userId || req.user.id)
}

var verifyPayment = async(req,res)=>{
    try{
        var userId  = getUserIdFromReq(req)
        if(!userId){
            return res.status(401).json({ message: "Invalid user in token" })
        }
        var {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature

        } = req.body 

        var generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")


        if(generated_signature !== razorpay_signature){
            return res.status(400).json({
                message: "payment verification failed"
            })
        }

        var cart = await Cart.findOne({userId})
        if(!cart || !Array.isArray(cart.items) || cart.items.length === 0){
            return res.status(400).json({
                message: "cart is empty"
            })
        }

        var totalAmount = 0

        for (var item of cart.items){
            var product = await Product.findById(item.product)
            if(!product){
                return res.status(400).json({
                    message: "product not found in cart"
                })
            }
            totalAmount += product.price * item.quantity
        }

        var newOrder = await Order.create({
            userId,
            items : cart.items,
            totalAmount,
            status : "paid"
        })

        cart.items = []
        await cart.save()

        res.status(200).json({
            message: "payment successful & order placed",
            order: newOrder
        })

    }catch(error){
        console.log("error",error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

module.exports = {
    verifyPayment
}