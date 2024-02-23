const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const ProcessMain = require('../models/processmainModel');


const createProcessMain = asyncHandler(async (req, res) => {
    try {
        const { processTitle, processDescription } = req.body;

        // Check if any process already exists
        const existingProcess = await ProcessMain.findOne();

        if (existingProcess) {
            return res.status(400).json({ success: false, code: 400, message: "A process already exists, only one process can be created" });
        }

        // Check if required fields are present
        if (!processTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Process title is required" });
        }

        // Create the process
        const process = await ProcessMain.create({
            processTitle,
            processDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, code: 201, data: process });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const updateProcessMain = asyncHandler(async (req, res) => {
    try {
        const { processId } = req.params;
        const { processTitle, processDescription } = req.body;

        // Check if required fields are present
        if (!processTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Process title is required" });
        }

        let updateFields = { processTitle, processDescription };

        // Update the process
        const updatedProcess = await ProcessMain.findByIdAndUpdate(processId, updateFields, { new: true });

        if (!updatedProcess) {
            return res.status(404).json({ success: false, code: 404, message: "Process not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedProcess });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

const getProcessMain = asyncHandler(async (req, res) => {
    try {
        const processes = await ProcessMain.findOne();

        // If no process main data is found, return a success response with a blank object
        if (!processes) {
            return res.status(200).json({ success: true, code: 200, data: {} });
        }

        // If process main data is found, return it in the response
        res.status(200).json({ success: true, code: 200, data: processes });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});


const deleteProcessMain = asyncHandler(async (req, res) => {
    try {
        const { processId } = req.params;

        const deletedProcess = await ProcessMain.findByIdAndDelete(processId);

        if (!deletedProcess) {
            return res.status(404).json({ success: false, code: 404, message: "Process not found" });
        }

        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

module.exports = { createProcessMain, getProcessMain, updateProcessMain, deleteProcessMain };
