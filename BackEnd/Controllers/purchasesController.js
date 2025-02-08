const purchasesService = require("../Services/PurchasesService");
const express = require("express");
const router = express.Router();
const adminRoutes = require("../Middleware/adminRoutes");
const jwt = require("../Middleware/token");

router.use(jwt, adminRoutes);

router.get("/", async (req, res) => {
  try {
    const purchases = await purchasesService.getAllPurchases();
    return res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json(error.message);
    console.log("error in get all purchases", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await purchasesService.getPurchaseById(id);
    return res.status(200).json(purchase);
  } catch (error) {
    console.log("error in get purchase by id", error.message);
    res.status(500).json(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const purchase = req.body;
    const response = await purchasesService.addPurchase(purchase);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in add purchase", error.message);
    res.status(500).json(error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = req.body;
    const response = await purchasesService.updatePurchase(id, purchase);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in update purchase", error.message);
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await purchasesService.deletePurchase(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in delete purchase", error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
