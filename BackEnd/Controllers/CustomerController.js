const customerService = require("../Services/CustomersService");
const express = require("express");
const router = express.Router();
const jwt = require("../Middleware/token");
const adminRoutes = require("../Middleware/adminRoutes");

router.use(jwt, adminRoutes);

router.get("/", async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    return res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error.message);
    console.log("ror in get all customers", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);
    return res.status(200).json(customer);
  } catch (error) {
    console.log("error in get customer by id", error.message);
    res.status(500).json(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const customer = req.body;
    const response = await customerService.addCustomer(customer);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in add customer", error.message);
    res.status(500).json(error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = req.body;
    const response = await customerService.updateCustomer(id, customer);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in update customer", error.message);
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await customerService.deleteCustomer(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in delete customer", error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
