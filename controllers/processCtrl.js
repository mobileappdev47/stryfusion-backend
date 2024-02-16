const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Process = require('../models/processModel');
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

const createProcess = asyncHandler(async (req, res) => {
    try {
        const existingProcess = await Process.findOne();
        if (existingProcess) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: "A Process already exists"
            });
        } else {
            const { mainTitle, mainDescription } = req.body;

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    code: 400,
                    message: "No files uploaded"
                });
            }

            const processCards = req.files.map((file, index) => {
                const { title, description } = req.body;
                return {
                    title: title[index], // Assuming title is sent as an array
                    description: description[index], // Assuming description is sent as an array
                    image: file.path
                };
            });

            const newProcess = new Process({
                mainTitle,
                mainDescription,
                processCard: processCards
            });

            await newProcess.save();

            res.status(201).json({
                success: true,
                code: 201,
                message: "Process created successfully",
                process: newProcess
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            code: 500,
            message: "Internal server error"
        });
    }
});

const updateProcess = async (req, res) => {
    try {
        const { mainTitle, mainDescription, processCards } = req.body; // Assuming it's processCards instead of processCard
        const { id } = req.params;

        const updatedFields = {};
        if (mainTitle) {
            updatedFields.mainTitle = mainTitle;
        }
        if (mainDescription) {
            updatedFields.mainDescription = mainDescription;
        }
        
        // Construct update object for process cards
        const updatedProcessCards = processCards.map(card => ({
            _id: card._id,
            title: card.title,
            description: card.description,
            image: card.image // Assuming you're sending the image field in the request body
        }));

        const updatedProcess = await Process.findByIdAndUpdate(id, {
            ...updatedFields,
            processCards: updatedProcessCards
        }, { new: true });

        if (!updatedProcess) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Process not found"
            });
        }

        res.status(200).json({
            success: true,
            code: 200,
            message: "Process updated successfully",
            process: updatedProcess
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            code: 500,
            message: "Internal server error"
        });
    }
};




const getProcess = asyncHandler(async (req, res) => {
    try {
        const process = await Process.findOne();
        if (!process) {
            return res.status(404).json({ success: false, code: 404, message: "No process found" });
        }
        res.status(200).json({ success: true, code: 200, message: "Process found", process });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, code: 500, message: "Internal server error" });
    }
});







const deleteProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const process = await Process.findById(id);

        if (!process) {
            return res.status(404).json({ success: false, message: 'Process not found' });
        }

        for (const imagePath of process.images) {
            fs.unlinkSync(imagePath);
        }

        const deletedProcess = await Process.findByIdAndDelete(id);

        res.json({ success: true, message: 'Process deleted successfully', deletedProcess });
    } catch (error) {
        console.error('Error deleting process:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = { upload, createProcess, getProcess, updateProcess, deleteProcess };
