const productService = require('../Services/ProductsService');
const express = require('express');
const router = express.Router();

// a route to get all products even if the user is not logged in
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error.message);
        console.log('error in get all products', error.message);
    }
}); 

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.log('error in get product by id', error.message);
        res.status(500).json(error.message);
    }
});

module.exports = router;