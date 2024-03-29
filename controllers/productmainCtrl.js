const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const ProductMain = require('../models/productmainModel');


const createProductMain = asyncHandler(async (req, res) => {
    try {
        const { productTitle, productDescription } = req.body;

        // Check if any product already exists
        const existingProduct = await ProductMain.findOne();

        if (existingProduct) {
            return res.status(400).json({ success: false, code: 400, message: "A product already exists, only one product can be created" });
        }

        // Create the product
        const product = await ProductMain.create({
            productTitle,
            productDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, code: 201, data: product });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 500, message: "Internal server error" });
    }
});

const updateProductMain = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const { productTitle, productDescription } = req.body;

        // Check if required fields are present
        if (!productTitle) {
            return res.status(400).json({ success: false, message: "Product title is required" });
        }

        let updateFields = { productTitle, productDescription };

        // Update the product
        const updatedProduct = await ProductMain.findByIdAndUpdate(productId, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, code: 400, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: "Internal server error" });
    }
});

const getProductMain = asyncHandler(async (req, res) => {
    try {
        const product = await ProductMain.findOne(); // Retrieve the first product found in the database

        // If no product main data is found, return a success response with a blank object
        if (!product) {
            return res.status(200).json({ success: true, code: 200, data: {} });
        }

        // If product main data is found, return it in the response
        res.status(200).json({ success: true, code: 200, data: product });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


const deleteProductMain = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await ProductMain.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, code: 404, message: "Product not found" });
        }

        // Check if associated images exist and delete them
        if (deletedProduct.images && deletedProduct.images.length > 0) {
            for (const imagePath of deletedProduct.images) {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Delete the image file
                }
            }
        }

        res.status(200).json({ success: true, code:200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code:400, message:"Internal server error" });
    }
});


module.exports = { createProductMain, getProductMain, updateProductMain, deleteProductMain };
