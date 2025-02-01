const ProductsModel = require("../Model/ProductsModel");

const getAllProducts = async () => {
  return await ProductsModel.find({});
};

const getProductById = async (id) => {
  return await ProductsModel.findById(id);
};

const addProduct = async (product) => {
 const newProduct =  new ProductsModel(product);
  await newProduct.save();
  return "Product added successfully";
};

const updateProduct = async (id, product) => {
  await ProductsModel.findByIdAndUpdate(id, product);
  return "Product updated successfully";
};

const deleteProduct = async (id) => {
  await ProductsModel.findByIdAndDelete(id);
  return "Product deleted successfully";
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
