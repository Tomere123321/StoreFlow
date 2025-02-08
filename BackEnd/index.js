require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const { fetchProducts } = require("../BackEnd/WebServices/Products");
const { fetchCustomers } = require("../BackEnd/WebServices/Customers");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, {}).then(() => {console.log("Connected to DB"); }).catch((err) => {
    console.error("Error connecting to DB:", err.message);
  });

const productsController = require("./Controllers/productsController");
app.use("/adminPanel/products" ,productsController);

//a route to get all products even if the user is not logged in
const usersProductsController = require("./Controllers/usersProductsController");
app.use("/users/products", usersProductsController);

const purchasesController = require("./Controllers/purchasesController");
app.use("/adminPanel/purchases", purchasesController);

const customerController = require("./Controllers/CustomerController");
app.use("/adminPanel/customers", customerController);

const userController = require("./Controllers/usersController");
app.use("/adminPanel/users", userController);

const authController = require("./Controllers/authController");
app.use("/auth", authController);





//http://localhost:PORT/
app.listen(process.env.PORT, async () => {
  try {
    await fetchProducts();
    await fetchCustomers();
  } catch (error) {
    console.error("error in fetching data", error.message);
  }
  console.log(`Server is running on Port ${process.env.PORT}`);
});
