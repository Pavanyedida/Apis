var Cart = require("../Model/cartModel")
var Product = require("../Model/ProductModel")
var razorpay = require("../config/razorpay")

function getUserIdFromReq(req) {
    return req.user && (req.user.userId || req.user.id)
}

var checkoutController = async(req,res)=>{
    try{
        var userId = getUserIdFromReq(req)
        if(!userId){
            return res.status(401).json({ message : "Invalid user in token" })
        }

        var cart = await Cart.findOne({userId})

        if(!cart || !cart.items || cart.items.length === 0){
            return res.status(200).json({
                message : "cart is empty"
            })
        }

        var products = await Product.find({
            _id: { $in: cart.items.map(item => item.product) }
        })
        var productMap = new Map(products.map(product => [String(product._id), product]))

        var validItems = []
        var totalAmount = 0

        for(var item of cart.items){
            var product = productMap.get(String(item.product))
            if(!product){
                continue
            }

            var lineTotal = Number(product.price) * Number(item.quantity)
            totalAmount += lineTotal
            validItems.push({
                productId: String(product._id),
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                lineTotal
            })
        }

        if(validItems.length === 0){
            cart.items = []
            await cart.save()
            return res.status(200).json({
                message : "cart is empty"
            })
        }

        // Keep cart clean if stale products were removed from DB
        if(validItems.length !== cart.items.length){
            cart.items = validItems.map(item => ({
                product: item.productId,
                quantity: item.quantity
            }))
            await cart.save()
        }

        var order = await razorpay.orders.create({
            amount : Math.round(totalAmount * 100),
            currency : "INR"

        })
        res.status(200).json({
            message : "checkout created",
            order,
            totalAmount,
            items: validItems
        })

    }catch(error){
        console.log("error",error);
        res.status(500).json({ message : "checkout failed", error : error.message })
    }
}
module.exports = {
    checkoutController
}