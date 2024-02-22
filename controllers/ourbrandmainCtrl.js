const asyncHandler = require('express-async-handler');
const OurBrandMain = require('../models/ourbrandmainModel');



const createBrandMain = asyncHandler(async (req, res) => {
    try {
        const { brandTitle } = req.body;

        // Check if required fields are present
        if (!brandTitle) {
            return res.status(400).json({ success: false, error: "Brand title is required" });
        }

        // Check if brand with the same title already exists
        const existingBrand = await OurBrandMain.findOne({ brandTitle });

        if (existingBrand) {
            return res.status(400).json({ success: false, error: "Brand with this title already exists" });
        }

        // Create the brand
        const brand = await OurBrandMain.create({ brandTitle });

        res.status(201).json({ success: true, data: brand });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const updateBrandMain = asyncHandler(async (req, res) => {
    try {
        const { brandId } = req.params;
        const { brandTitle } = req.body;

        // Check if required fields are present
        if (!brandTitle) {
            return res.status(400).json({ success: false, error: "Brand title is required" });
        }

        // Update the brand
        const updatedBrand = await OurBrandMain.findByIdAndUpdate(brandId, { brandTitle }, { new: true });

        if (!updatedBrand) {
            return res.status(404).json({ success: false, error: "Brand not found" });
        }

        res.status(200).json({ success: true, data: updatedBrand });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const getBrandsMain = asyncHandler(async (req, res) => {
    try {
        const brands = await OurBrandMain.find();
        res.status(200).json({ success: true, data: brands });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteBrandMain = asyncHandler(async (req, res) => {
    try {
        const { brandId } = req.params;

        const deletedBrand = await OurBrandMain.findByIdAndDelete(brandId);

        if (!deletedBrand) {
            return res.status(404).json({ success: false, error: "Brand not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createBrandMain, getBrandsMain, updateBrandMain, deleteBrandMain };
