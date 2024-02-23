const asyncHandler = require('express-async-handler');
const OurBrandMain = require('../models/ourbrandmainModel');



const createBrandMain = asyncHandler(async (req, res) => {
    try {
        const { brandTitle } = req.body;

        // Check if any brand already exists
        const existingBrand = await OurBrandMain.findOne();

        if (existingBrand) {
            return res.status(400).json({ success: false, code: 400, message: "A brand already exists, only one brand can be created" });
        }

        // Check if required fields are present
        if (!brandTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Brand title is required" });
        }

        // Create the brand
        const brand = await OurBrandMain.create({ brandTitle });

        res.status(201).json({ success: true, code: 201, data: brand });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const updateBrandMain = asyncHandler(async (req, res) => {
    try {
        const { brandId } = req.params;
        const { brandTitle } = req.body;

        // Check if required fields are present
        if (!brandTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Brand title is required" });
        }

        // Update the brand
        const updatedBrand = await OurBrandMain.findByIdAndUpdate(brandId, { brandTitle }, { new: true });

        if (!updatedBrand) {
            return res.status(404).json({ success: false, code: 404, message: "Brand not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedBrand });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

const getBrandsMain = asyncHandler(async (req, res) => {
    try {
        const brands = await OurBrandMain.findOne();

        // If no brand main data is found, return a success response with a blank object
        if (!brands) {
            return res.status(200).json({ success: true, code: 200, data: {} });
        }

        // If brand main data is found, return it in the response
        res.status(200).json({ success: true, code: 200, data: brands });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});


const deleteBrandMain = asyncHandler(async (req, res) => {
    try {
        const { brandId } = req.params;

        const deletedBrand = await OurBrandMain.findByIdAndDelete(brandId);

        if (!deletedBrand) {
            return res.status(404).json({ success: false, code: 404, message: "Brand not found" });
        }

        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

module.exports = { createBrandMain, getBrandsMain, updateBrandMain, deleteBrandMain };
