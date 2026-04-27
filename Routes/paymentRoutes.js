var express = require("express")
const { checkoutController } = require("../Controller/paymentController")
const { verifyPayment } = require("../Controller/verifyPaymentController")
const { getAllProducts } = require("../Controller/ProductController")
const authMiddleware = require("../Middleware/authMiddleware")

var router = express.Router()

// Compatibility route: some clients call products under paymentRoutes
router.get("/products", authMiddleware, getAllProducts)

router.post("/checkout",authMiddleware,checkoutController)

router.post("/verifypayment",authMiddleware,verifyPayment)

module.exports = router 