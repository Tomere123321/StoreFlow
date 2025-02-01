const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    image: [{type: String, required: true}]
})

const ProductsModel = mongoose.model('product', productsSchema);


module.exports = ProductsModel;