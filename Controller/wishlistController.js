var Wishlist = require("../Model/wishlistModel")

function getUserIdFromReq(req) {
  return req.user && (req.user.userId || req.user.id)
}

// ===================
// GET WISHLIST
// ===================
var getWishlist = async (req, res) => {
  try {
    var userId = getUserIdFromReq(req)
    if (!userId) {
      return res.status(401).json({ message: "Invalid user in token" })
    }

    var wishlist = await Wishlist.findOne({ userId }).populate("items.product")
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, items: [] })
    }

    return res.status(200).json({ wishlist })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error: "server error" })
  }
}

// ===================
// ADD TO WISHLIST
// ===================
var addToWishlist = async (req, res) => {
  try {
    var userId = getUserIdFromReq(req)
    if (!userId) {
      return res.status(401).json({ message: "Invalid user in token" })
    }

    var productId = req.params.productId || req.body.productId
    if (!productId) {
      return res.status(400).json({ message: "productId required" })
    }

    var wishlist = await Wishlist.findOne({ userId })

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId,
        items: [{ product: productId }]
      })
      return res.status(201).json({ message: "wishlist created", data: wishlist })
    }

    var exists = wishlist.items.find(item => item.product == productId)
    if (exists) {
      return res.status(200).json({ message: "already in wishlist", data: wishlist })
    }

    wishlist.items.push({ product: productId })
    await wishlist.save()

    return res.status(200).json({ message: "wishlist updated", data: wishlist })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error: "server error" })
  }
}

// ===================
// REMOVE FROM WISHLIST
// ===================
var removeFromWishlist = async (req, res) => {
  try {
    var userId = getUserIdFromReq(req)
    if (!userId) {
      return res.status(401).json({ message: "Invalid user in token" })
    }

    var productId = req.params.productId
    if (!productId) {
      return res.status(400).json({ message: "productId required" })
    }

    var wishlist = await Wishlist.findOne({ userId })
    if (!wishlist) {
      return res.status(404).json({ message: "wishlist not found" })
    }

    var before = wishlist.items.length
    wishlist.items = wishlist.items.filter(item => item.product != productId)
    var after = wishlist.items.length

    if (before === after) {
      return res.status(404).json({ message: "product not in wishlist" })
    }

    await wishlist.save()
    return res.status(200).json({ message: "removed from wishlist", data: wishlist })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error: "server error" })
  }
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
}

