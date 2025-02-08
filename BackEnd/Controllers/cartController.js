const prouctModel = require("../Model/ProductsModel");
const express = require("express");
const router = express.Router();
const jwt = require('../Middleware/token')

router.use(jwt)

// get all cart items
router.get("/", async (req, res) => {
  try {
    const products = await prouctModel.find({
      _id: { $in: req.user.cartItems },
    });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem._id === product.id
      );
      return {
        ...product.toJSON(),
        quantity: item.quantity,
      };
    });
    res.json(cartItems);
  } catch (error) {
    console.log("error in getAllCartItems", error.message);
    res.status(500).json("Internal Server Error", error.message);
  }
});

// add to cart
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error in addToCart", error.message);
    res.status(500).json("Internal Server Error", error.message);
  }
});

// remove all from cart
router.delete("/", async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error in removeAllFromCart", error.message);
    res.status(500).json("Internal Server Error", error.message);
  }
});

// update quantity
router.post("/:id", async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json("Product not found in cart");
    }
  } catch (error) {
    console.log("error in updateQuantity", error.message);
    res.status(500).json("Internal Server Error", error.message);
  }
});

module.exports = router;