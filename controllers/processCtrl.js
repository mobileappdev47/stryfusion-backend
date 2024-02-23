const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Process = require('../models/processModel');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Rename the file with a unique name
    },
});


const upload = multer({ storage: storage });

const createProcess = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if required fields are present
        if (!title || !description) {
            return res.status(400).json({ success: false,code:400, message: "Title and description are required" });
        }

        let imagePath = "";
        // Check if a file was uploaded
        if (req.file) {
            // Construct the file path
            imagePath = req.file.path;
        }

        // Create the process
        const process = await Process.create({
            title,
            description,
            image: imagePath
        });

        res.status(201).json({ success: true,code:201, data: process });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false,code:400, message: err.message });
    }
};


const updateProcess = async (req, res) => {
    try {
        const { processId } = req.params;
        const { title, description } = req.body;

        let updateFields = {};

        // Check if title and description are provided
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;

        // Check if a file was uploaded
        if (req.file) {
            // Construct the file path
            const imagePath = req.file.path;
            updateFields.image = imagePath;

            // Delete old image if it exists
            const oldProcess = await Process.findById(processId);
            if (oldProcess && oldProcess.image && fs.existsSync(oldProcess.image)) {
                fs.unlinkSync(oldProcess.image);
            }
        }

        // Update the process
        const updatedProcess = await Process.findByIdAndUpdate(processId, updateFields, { new: true });

        if (!updatedProcess) {
            return res.status(404).json({ success: false,code:404, message: "Process not found" });
        }

        res.status(200).json({ success: true,code:200, data: updatedProcess });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false,code:400, message: err.message });
    }
};


const getProcess = asyncHandler(async (req, res) => {
    try {
        const processes = await Process.find();

        // If no processes are found, return a success response with an empty array
        if (!processes || processes.length === 0) {
            return res.status(200).json({ success: true, code: 200, data: [] });
        }

        // If processes are found, return them in the response
        res.status(200).json({ success: true, code: 200, data: processes });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});



const deleteProcess = asyncHandler(async (req, res) => {
    try {
        const { processId } = req.params;

        // Find the process to delete and get the image path
        const processToDelete = await Process.findById(processId);
        const imagePath = processToDelete?.image;

        const deletedProcess = await Process.findByIdAndDelete(processId);

        if (!deletedProcess) {
            return res.status(404).json({ success: false, code: 404, message: "Process not found" });
        }

        // Delete the image file if it exists
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

module.exports = { upload, createProcess, getProcess, updateProcess, deleteProcess };
