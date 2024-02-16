const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Products = require('../models/productsModel');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

const createProduct = asyncHandler(async (req, res) => {
    try {
        const { mainTitle, mainDescription, products } = req.body;

        // Check if products exist and if it's an array
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: "Products must be an array" });
        }

        const newProducts = products.map(product => ({
            productTitle: product.productTitle,
            productImage: product.productImage // Assuming Multer saves the file path in productImage
        }));

        const newProduct = new Products({
            mainTitle,
            mainDescription,
            products: newProducts
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const updateProduct = async (req, res) => {
    try {
        const { mainTitle, mainDescription, products } = req.body;
        const updatedProduct = {
            mainTitle,
            mainDescription,
            products: [{
                productTitle: products[0].productTitle,
                productImage: req.file ? req.file.path : products[0].productImage
            }]
        };
        const updatedProductResult = await Products.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
        res.json(updatedProductResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};




const getProduct = asyncHandler(async (req, res) => {
    
});







const deleteProduct = asyncHandler(async (req, res) => {
  
});

module.exports = { upload, createProduct, getProduct, updateProduct, deleteProduct };
