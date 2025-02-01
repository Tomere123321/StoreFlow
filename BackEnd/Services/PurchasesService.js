const purchaseModel = require("../model/PurchasesModel");

const getAllPurchases = async () => {
  return await purchaseModel
    .find({})
    .populate("CustomerId", "firstName lastName city")
    .populate("ProductId", "name price quantity image");
};

const getPurchaseById = async (id) => {
  return await purchaseModel
    .findById(id)
    .populate("CustomerId", "firstName lastName city")
    .populate("ProductId", "name price quantity image");
};

const addPurchase = async (purchase) => {
  const newPurchase = new purchaseModel(purchase);
  await newPurchase.save();
  return "Purchase added successfully";
};

const updatePurchase = async (id, purchase) => {
  await purchaseModel.findByIdAndUpdate(id, purchase);
  return "Purchase updated successfully";
};

const deletePurchase = async (id) => {
  await purchaseModel.findByIdAndDelete(id);
  return "Purchase deleted successfully";
};

module.exports = {
  getAllPurchases,
  getPurchaseById,
  addPurchase,
  updatePurchase,
  deletePurchase,
};
