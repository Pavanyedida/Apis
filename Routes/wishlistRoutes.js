var express = require("express")
var router = express.Router()

var authMiddleware = require("../Middleware/authMiddleware")
var {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require("../Controller/wishlistController")

router.get("/wishlist", authMiddleware, getWishlist)
router.post("/wishlist/:productId", authMiddleware, addToWishlist)
router.delete("/wishlist/:productId", authMiddleware, removeFromWishlist)

module.exports = router

