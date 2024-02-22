const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const ClientMain = require('../models/clientmainModel');


const createClientMain = asyncHandler(async (req, res) => {
    try {
        const { clientTitle, clientDescription } = req.body;

        // Check if any client already exists
        const existingClient = await ClientMain.findOne();

        if (existingClient) {
            return res.status(400).json({ success: false, error: "A client already exists, only one client can be created" });
        }

        // Check if required fields are present
        if (!clientTitle) {
            return res.status(400).json({ success: false, error: "Client title is required" });
        }

        // Create the client
        const client = await ClientMain.create({
            clientTitle,
            clientDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, data: client });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});


const updateClientMain = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.params;
        const { clientTitle, clientDescription } = req.body;

        // Check if required fields are present
        if (!clientTitle) {
            return res.status(400).json({ success: false, error: "Client title is required" });
        }

        let updateFields = { clientTitle, clientDescription };

        // Update the client
        const updatedClient = await ClientMain.findByIdAndUpdate(clientId, updateFields, { new: true });

        if (!updatedClient) {
            return res.status(404).json({ success: false, error: "Client not found" });
        }

        res.status(200).json({ success: true, data: updatedClient });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const getClientMain = asyncHandler(async (req, res) => {
    try {
        const clients = await ClientMain.find();
        res.status(200).json({ success: true, data: clients });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteClientMain = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.params;

        const deletedClient = await ClientMain.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).json({ success: false, error: "Client not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createClientMain, getClientMain, updateClientMain, deleteClientMain };
