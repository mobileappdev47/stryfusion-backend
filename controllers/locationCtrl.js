const asyncHandler = require("express-async-handler");
const Locations = require('../models/locationsModel')



const createLocation = asyncHandler( async (req, res) => {
    try {
        const { locationname, lat, long } = req.body;

        // Check if required fields are present
        if (!locationname || !lat || !long) {
            return res.status(400).json({ success: false, error: "Location name, latitude, and longitude are required" });
        }

        // Create the location
        const location = await Locations.create({
            locationname,
            coordinates: { lat, long }
        });

        res.status(201).json({ success: true, data: location });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});


const updateLocation = asyncHandler (async(req, res) => {
    try {
        const { locationId } = req.params;
        const { locationname, lat, long } = req.body;

        // Check if required fields are present
        if (!locationname || !lat || !long) {
            return res.status(400).json({ success: false, error: "Location name, latitude, and longitude are required" });
        }

        // Update the location
        const updatedLocation = await Locations.findByIdAndUpdate(locationId, {
            locationname,
            coordinates: { lat, long }
        }, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({ success: false, error: "Location not found" });
        }

        res.status(200).json({ success: true, data: updatedLocation });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
})     

const getLocations = asyncHandler(async(req, res) => {
    try {
        const locations = await Locations.find();
        res.status(200).json({ success: true, data: locations });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
})

const deleteLocation = asyncHandler(async( req, res) => {
    try {
        const { locationId } = req.params;

        const deletedLocation = await Locations.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ success: false, error: "Location not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
})


module.exports = {createLocation, updateLocation, getLocations, deleteLocation }