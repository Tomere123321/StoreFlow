const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const userModel = require("../Model/usersModel");

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json("Please enter all fields");
    }

    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json("Please enter all fields");
    }

    const user = await userModel.findOne({ userName });
    if (user) {
      return res.status(400).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      userName,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json("User registered successfully");
  } catch (error) {
    console.log("error in register controller", error.message);
    return res.status(500).json(error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    return res.status(500).json(error.message);
  }
});

module.exports = router;
