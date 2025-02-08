const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
});

const userModel = mongoose.model("user", userShcema);

module.exports = userModel;
