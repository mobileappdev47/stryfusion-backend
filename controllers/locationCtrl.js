const asyncHandler = require("express-async-handler");
const Locations = require('../models/locationsModel')



const createLocation = asyncHandler(async (req, res) => {
    try {
        const { locationname, lat, long } = req.body;

        // Check if required fields are present
        if (!locationname || !lat || !long) {
            return res.status(400).json({ success: false, code: 400, message: "Location name, latitude, and longitude are required" });
        }

        // Create the location
        const location = await Locations.create({
            locationname,
            coordinates: { lat, long }
        });

        res.status(201).json({ success: true, code: 201, data: location });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const updateLocation = asyncHandler(async (req, res) => {
    try {
        const { locationId } = req.params;
        const { locationname, lat, long } = req.body;

        // Check if required fields are present
        if (!locationname || !lat || !long) {
            return res.status(400).json({ success: false, code: 400, message: "Location name, latitude, and longitude are required" });
        }

        // Update the location
        const updatedLocation = await Locations.findByIdAndUpdate(locationId, {
            locationname,
            coordinates: { lat, long }
        }, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({ success: false, code: 404, message: "Location not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedLocation });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
})

const getLocations = asyncHandler(async (req, res) => {
    try {
        const locations = await Locations.find();

        // If no locations are found, return a success response with an empty array
        if (!locations || locations.length === 0) {
            return res.status(200).json({ success: true, code: 200, data: [] });
        }

        // If locations are found, return them in the response
        res.status(200).json({ success: true, code: 200, data: locations });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});


const deleteLocation = asyncHandler(async (req, res) => {
    try {
        const { locationId } = req.params;

        const deletedLocation = await Locations.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ success: false, code: 404, message: "Location not found" });
        }

        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
})


module.exports = { createLocation, updateLocation, getLocations, deleteLocation }