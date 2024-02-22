const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const ProductMain = require('../models/productmainModel');


const createProductMain = asyncHandler(async (req, res) => {
    try {
        const { productTitle, productDescription } = req.body;

        // Check if required fields are present
        if (!productTitle) {
            return res.status(400).json({ success: false, error: "Product title is required" });
        }

        // Check if product with the same title already exists
        const existingProduct = await ProductMain.findOne({ productTitle });

        if (existingProduct) {
            return res.status(400).json({ success: false, error: "Product with this title already exists" });
        }

        // Create the product
        const product = await ProductMain.create({
            productTitle,
            productDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, data: product });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const updateProductMain = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const { productTitle, productDescription } = req.body;

        // Check if required fields are present
        if (!productTitle) {
            return res.status(400).json({ success: false, error: "Product title is required" });
        }

        let updateFields = { productTitle, productDescription };

        // Update the product
        const updatedProduct = await ProductMain.findByIdAndUpdate(productId, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const getProductMain = asyncHandler(async (req, res) => {
    try {
        const products = await ProductMain.find();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteProductMain = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await ProductMain.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createProductMain, getProductMain, updateProductMain, deleteProductMain };
