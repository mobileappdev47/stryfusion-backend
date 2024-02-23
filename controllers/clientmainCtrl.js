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
            return res.status(400).json({ success: false, code: 400, message: "A client already exists, only one client can be created" });
        }

        // Check if required fields are present
        if (!clientTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Client title is required" });
        }

        // Create the client
        const client = await ClientMain.create({
            clientTitle,
            clientDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, code: 201, data: client });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const updateClientMain = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.params;
        const { clientTitle, clientDescription } = req.body;

        // Check if required fields are present
        if (!clientTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Client title is required" });
        }

        let updateFields = { clientTitle, clientDescription };

        // Update the client
        const updatedClient = await ClientMain.findByIdAndUpdate(clientId, updateFields, { new: true });

        if (!updatedClient) {
            return res.status(404).json({ success: false, code: 404, message: "Client not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedClient });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

const getClientMain = asyncHandler(async (req, res) => {
    try {
        const clients = await ClientMain.findOne();

        // If no client main data is found, return a success response with a blank object
        if (!clients) {
            return res.status(200).json({ success: true, code: 200, data: {} });
        }

        // If client main data is found, return it in the response
        res.status(200).json({ success: true, code: 200, data: clients });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});

const deleteClientMain = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.params;

        const deletedClient = await ClientMain.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).json({ success: false, code: 404, message: "Client not found" });
        }
        4
        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

module.exports = { createClientMain, getClientMain, updateClientMain, deleteClientMain };
