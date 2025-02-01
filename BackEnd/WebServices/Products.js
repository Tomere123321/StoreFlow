const axios = require("axios");
const productsModel = require("../Model/ProductsModel");

const fetchProducts = async () => {
  try {
    const existingProductsCount = await productsModel.countDocuments();

    if (existingProductsCount > 0) {
      console.log("Products already exist in the database");
      return;
    }

    const response = await axios.get("https://dummyjson.com/products");
    const productsData = response.data.products.map((product) => ({
      name: product.title,
      price: product.price,
      quantity: product.stock,
      image: product.images,
    }));
    
    await productsModel.insertMany(productsData);

    console.log(`${productsData.length} products inserted successfully`);
  } catch (error) {
    console.error("Error fetching products data:", error.message);
  }
};

module.exports = {fetchProducts};
