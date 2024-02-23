const asyncHandler = require("express-async-handler");
const Client = require('../models/clientModel')
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });



const createClient = asyncHandler(async (req, res) => {
    try {
        const { clientName, clientRole, clientReview } = req.body;

        // Check if required fields are present
        if (!clientName || !clientRole || !clientReview) {
            return res.status(400).json({ success: false, code: 400, message: "Client name, role, and review are required" });
        }

        // Create the client
        const client = await Client.create({
            clientImage: req.file ? req.file.path : null,
            clientName,
            clientRole,
            clientReview
        });

        res.status(201).json({ success: true, code: 201, data: client });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const updateClient = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.params;
        const { clientName, clientRole, clientReview } = req.body;

        // Check if required fields are present
        if (!clientName || !clientRole || !clientReview) {
            return res.status(400).json({ success: false, code: 400, message: "Client name, role, and review are required" });
        }

        let updateFields = { clientName, clientRole, clientReview };

        // Check if a file was uploaded
        if (req.file) {
            // Construct the file path
            const clientImage = req.file.path;
            updateFields.clientImage = clientImage;

            // Delete old image if it exists
            const oldClient = await Client.findById(clientId);
            if (oldClient && oldClient.clientImage && fs.existsSync(oldClient.clientImage)) {
                fs.unlinkSync(oldClient.clientImage);
            }
        }

        // Update the client
        const updatedClient = await Client.findByIdAndUpdate(clientId, updateFields, { new: true });

        if (!updatedClient) {
            return res.status(404).json({ success: false, code: 404, message: "Client not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedClient });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

const getAllClients = asyncHandler(async (req, res) => {
    try {
        const clients = await Client.find();

        // If no clients are found, return a success response with an empty array
        if (!clients || clients.length === 0) {
            return res.status(200).json({ success: true, code: 200, data: [] });
        }

        // If clients are found, return them in the response
        res.status(200).json({ success: true, data: clients });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});


const deleteClient = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.params;

        // Find the client to delete and get the image path
        const clientToDelete = await Client.findById(clientId);
        const imagePath = clientToDelete?.clientImage;

        const deletedClient = await Client.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).json({ success: false, code: 404, message: "Client not found" });
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



module.exports = { upload, createClient, updateClient, getAllClients, deleteClient }