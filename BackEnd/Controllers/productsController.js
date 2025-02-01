const productsService = require("../Services/ProductsService");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
    console.log("error in get all products", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log("error in get product by id", error.message);
    res.status(500).json(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const product = req.body;
    const response = await productsService.addProduct(product);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in add product", error.message);
    res.status(500).json(error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const response = await productsService.updateProduct(id, product);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in update product", error.message);
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.deleteProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in delete product", error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
