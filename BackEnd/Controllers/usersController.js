const usersService = require("../Services/usersService");
const express = require("express");
const router = express.Router();
const adminRoutes = require("../Middleware/adminRoutes");
const jwt = require("../Middleware/token");

router.get("/", jwt, adminRoutes, async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
    console.log("error in get all users", error.message);
  }
});

router.get("/:id", jwt, adminRoutes, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log("error in get user by id", error.message);
    res.status(500).json(error.message);
  }
});

router.post("/add", jwt, adminRoutes, async (req, res) => {
  try {
    const user = req.body;
    const response = await usersService.addUser(user);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in add user", error.message);
    res.status(500).json(error.message);
  }
});

router.put("/update/:id", jwt, adminRoutes, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const response = await usersService.updateUser(id, user);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in update user", error.message);
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:id", jwt, adminRoutes, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await usersService.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error in delete user", error.message);
    res.status(500).json(error.message);
  }
});


module.exports = router;
