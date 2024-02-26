const asyncHandler = require('express-async-handler');
const Revolution = require('../models/revolutionModel');

// Create a revolution
const createRevolution = asyncHandler(async (req, res) => {
    try {
        const { revolutionTitle, revolutionDescription, revolutionContent } = req.body;

        // Check if any revolution already exists
        const existingRevolution = await Revolution.findOne();

        if (existingRevolution) {
            return res.status(400).json({ success: false, code: 400, message: "A revolution already exists, only one revolution can be created" });
        }

        // Check if required fields are present
        if (!revolutionTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Revolution title is required" });
        }

        // Create the revolution
        const revolution = await Revolution.create({
            revolutionTitle,
            revolutionDescription,
            revolutionContent
        });

        res.status(201).json({ success: true, code: 201, data: revolution });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

// Update a revolution
const updateRevolution = asyncHandler(async (req, res) => {
    try {
        const { revolutionId } = req.params;
        const { revolutionTitle, revolutionDescription, revolutionContent } = req.body;

        // Check if required fields are present
        if (!revolutionTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Revolution title is required" });
        }

        // Update the revolution
        const updatedRevolution = await Revolution.findByIdAndUpdate(revolutionId, {
            revolutionTitle,
            revolutionDescription,
            revolutionContent
        }, { new: true });

        if (!updatedRevolution) {
            return res.status(404).json({ success: false, code: 404, message: "Revolution not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedRevolution });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

// Get the revolution
const getRevolution = asyncHandler(async (req, res) => {
    try {
        const revolution = await Revolution.findOne();

        if (!revolution) {
            return res.status(200).json({ success: true, code: 200, data: {} });
        }

        res.status(200).json({ success: true, code: 200, data: revolution });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});

// Delete a revolution
const deleteRevolution = asyncHandler(async (req, res) => {
    try {
        const { revolutionId } = req.params;

        const deletedRevolution = await Revolution.findByIdAndDelete(revolutionId);

        if (!deletedRevolution) {
            return res.status(404).json({ success: false, code: 404, message: "Revolution not found" });
        }

        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

module.exports = { createRevolution, getRevolution, updateRevolution, deleteRevolution };
