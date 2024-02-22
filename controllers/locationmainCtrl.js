const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const LocationMain = require('../models/locationmainModel');


const createLocationMain = asyncHandler(async (req, res) => {
    try {
        const { locationTitle, locationDescription } = req.body;

        // Check if required fields are present
        if (!locationTitle) {
            return res.status(400).json({ success: false, error: "Location title is required" });
        }

        // Check if location with the same title already exists
        const existingLocation = await LocationMain.findOne({ locationTitle });

        if (existingLocation) {
            return res.status(400).json({ success: false, error: "Location with this title already exists" });
        }

        // Create the location
        const location = await LocationMain.create({
            locationTitle,
            locationDescription
        });

        res.status(201).json({ success: true, data: location });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});


const updateLocationMain = asyncHandler(async (req, res) => {
    try {
        const { locationId } = req.params;
        const { locationTitle, locationDescription } = req.body;

        // Check if required fields are present
        if (!locationTitle) {
            return res.status(400).json({ success: false, error: "Location title is required" });
        }

        let updateFields = { locationTitle, locationDescription };

        // Update the location
        const updatedLocation = await LocationMain.findByIdAndUpdate(locationId, updateFields, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({ success: false, error: "Location not found" });
        }

        res.status(200).json({ success: true, data: updatedLocation });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const getLocationMain = asyncHandler(async (req, res) => {
    try {
        const locations = await LocationMain.find();
        res.status(200).json({ success: true, data: locations });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteLocationMain = asyncHandler(async (req, res) => {
    try {
        const { locationId } = req.params;

        const deletedLocation = await LocationMain.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ success: false, error: "Location not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createLocationMain, getLocationMain, updateLocationMain, deleteLocationMain };