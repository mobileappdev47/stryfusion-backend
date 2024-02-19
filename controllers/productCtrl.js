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

const createProduct = async (req, res) => {
    try {
        const { productTitle } = req.body;

        // Check if required fields are present
        if (!productTitle || !req.file) {
            return res.status(400).json({ success: false, error: "Product title and image are required" });
        }

        const productImage = req.file.path;

        // Create the product
        const product = await Products.create({
            productTitle,
            productImage
        });

        res.status(201).json({ success: true, data: product });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productTitle } = req.body;

        // Check if required fields are present
        if (!productTitle) {
            return res.status(400).json({ success: false, error: "Product title is required" });
        }

        let updateFields = { productTitle };

        // Check if a file was uploaded
        if (req.file) {
            // Construct the file path
            const productImage = req.file.path;
            updateFields.productImage = productImage;

            // Delete old image
            const oldProduct = await Products.findById(productId);
            if (oldProduct && oldProduct.productImage) {
                fs.unlinkSync(oldProduct.productImage);
            }
        }

        // Update the product
        const updatedProduct = await Products.findByIdAndUpdate(productId, updateFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
};




const getProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the product to delete and get the image path
        const productToDelete = await Products.findById(productId);
        const imagePath = productToDelete.productImage;

        const deletedProduct = await Products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        // Delete the image file
        if (imagePath) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { upload, createProduct, getProduct, updateProduct, deleteProduct };
