const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const LocationMain = require('../models/locationmainModel');


const createLocationMain = asyncHandler(async (req, res) => {
    try {
        const { locationTitle, locationDescription } = req.body;

        // Check if any location already exists
        const existingLocation = await LocationMain.findOne();

        if (existingLocation) {
            return res.status(400).json({ success: false,code:400, message: "A location already exists, only one location can be created" });
        }

        // Check if required fields are present
        if (!locationTitle) {
            return res.status(400).json({ success: false,code:400, message: "Location title is required" });
        }

        // Create the location
        const location = await LocationMain.create({
            locationTitle,
            locationDescription
        });

        res.status(201).json({ success: true,code:201, data: location });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false,code:400, message: err.message });
    }
});



const updateLocationMain = asyncHandler(async (req, res) => {
    try {
        const { locationId } = req.params;
        const { locationTitle, locationDescription } = req.body;

        // Check if required fields are present
        if (!locationTitle) {
            return res.status(400).json({ success: false,code:400, message: "Location title is required" });
        }

        let updateFields = { locationTitle, locationDescription };

        // Update the location
        const updatedLocation = await LocationMain.findByIdAndUpdate(locationId, updateFields, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({ success: false,code:404, message: "Location not found" });
        }

        res.status(200).json({ success: true,code:200, data: updatedLocation });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false,code:400,message: err.message });
    }
});

const getLocationMain = asyncHandler(async (req, res) => {
    try {
        const locations = await LocationMain.findOne();

        // If no location main data is found, return a success response with a blank object
        if (!locations) {
            return res.status(200).json({ success: true,code:200, data: {} });
        }

        // If location main data is found, return it in the response
        res.status(200).json({ success: true, code:200,data: locations });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false,code:500, message: err.message });
    }
});

const deleteLocationMain = asyncHandler(async (req, res) => {
    try {
        const { locationId } = req.params;

        const deletedLocation = await LocationMain.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ success: false,code:404, message: "Location not found" });
        }

        res.status(200).json({ success: true,code:200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false,code:400, message: err.message });
    }
});

module.exports = { createLocationMain, getLocationMain, updateLocationMain, deleteLocationMain };
