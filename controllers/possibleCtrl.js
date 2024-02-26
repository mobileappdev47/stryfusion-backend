const asyncHandler = require('express-async-handler');
const Possible = require('../models/possibleModel');

// Create a possible
const createPossible = asyncHandler(async (req, res) => {
    try {
        const { possibleTitle, possibleDescription } = req.body;

        // Check if required fields are present
        if (!possibleTitle) {
            return res.status(400).json({ success: false, error: "Possible title is required" });
        }

        // Check if possible with the same title already exists
        const existingPossible = await Possible.findOne({ possibleTitle });

        if (existingPossible) {
            return res.status(400).json({ success: false, error: "Possible with this title already exists" });
        }

        // Create the possible
        const possible = await Possible.create({
            possibleTitle,
            possibleDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, data: possible });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

// Get all possibles
const getPossibles = asyncHandler(async (req, res) => {
    try {
        const possibles = await Possible.findOne();
        res.status(200).json({ success: true, data: possibles });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update a possible
const updatePossible = asyncHandler(async (req, res) => {
    try {
        const { possibleId } = req.params;
        const { possibleTitle, possibleDescription } = req.body;

        // Check if required fields are present
        if (!possibleTitle) {
            return res.status(400).json({ success: false, error: "Possible title is required" });
        }

        // Update the possible
        const updatedPossible = await Possible.findByIdAndUpdate(possibleId, { possibleTitle, possibleDescription }, { new: true });

        if (!updatedPossible) {
            return res.status(404).json({ success: false, error: "Possible not found" });
        }

        res.status(200).json({ success: true, data: updatedPossible });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

// Delete a possible
const deletePossible = asyncHandler(async (req, res) => {
    try {
        const { possibleId } = req.params;

        const deletedPossible = await Possible.findByIdAndDelete(possibleId);

        if (!deletedPossible) {
            return res.status(404).json({ success: false, error: "Possible not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createPossible, getPossibles, updatePossible, deletePossible };
