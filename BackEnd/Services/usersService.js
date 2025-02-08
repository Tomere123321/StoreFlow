const userModel = require('../Model/usersModel')
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  return await userModel.find({}).select("-password");
};

const getUserById = async (id) => {
  return await userModel.findById(id).select("-password");
};

const addUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  const newUser =  new userModel(user);
  await newUser.save();
  return "User added successfully";
};

const updateUser = async (id, user) => {
  await userModel.findByIdAndUpdate(id, user);
  return "User updated successfully";
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
  return "User deleted successfully";
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
