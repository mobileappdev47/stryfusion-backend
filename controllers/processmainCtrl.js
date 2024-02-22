const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const ProcessMain = require('../models/processmainModel');


const createProcessMain = asyncHandler(async (req, res) => {
    try {
        const { processTitle, processDescription } = req.body;

        // Check if required fields are present
        if (!processTitle) {
            return res.status(400).json({ success: false, error: "Process title is required" });
        }

        // Check if process with the same title already exists
        const existingProcess = await ProcessMain.findOne({ processTitle });

        if (existingProcess) {
            return res.status(400).json({ success: false, error: "Process with this title already exists" });
        }

        // Create the process
        const process = await ProcessMain.create({
            processTitle,
            processDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, data: process });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const updateProcessMain = asyncHandler(async (req, res) => {
    try {
        const { processId } = req.params;
        const { processTitle, processDescription } = req.body;

        // Check if required fields are present
        if (!processTitle) {
            return res.status(400).json({ success: false, error: "Process title is required" });
        }

        let updateFields = { processTitle, processDescription };

        // Update the process
        const updatedProcess = await ProcessMain.findByIdAndUpdate(processId, updateFields, { new: true });

        if (!updatedProcess) {
            return res.status(404).json({ success: false, error: "Process not found" });
        }

        res.status(200).json({ success: true, data: updatedProcess });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const getProcessMain = asyncHandler(async (req, res) => {
    try {
        const processes = await ProcessMain.find();
        res.status(200).json({ success: true, data: processes });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteProcessMain = asyncHandler(async (req, res) => {
    try {
        const { processId } = req.params;

        const deletedProcess = await ProcessMain.findByIdAndDelete(processId);

        if (!deletedProcess) {
            return res.status(404).json({ success: false, error: "Process not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createProcessMain, getProcessMain, updateProcessMain, deleteProcessMain };
