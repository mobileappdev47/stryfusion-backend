const asyncHandler = require("express-async-handler");
const Experience = require('../models/experienceModel')
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



const createExperience = asyncHandler (async (req, res) => {
    try {
        const { experienceTitle, experienceDescription } = req.body;

        // Check if required fields are present
        if (!experienceTitle || !experienceDescription) {
            return res.status(400).json({ success: false, error: "Experience title and description are required" });
        }

        // Create the experience
        const experience = await Experience.create({
            experienceTitle,
            experienceDescription,
            experienceImage: req.file ? req.file.path : null
        });

        res.status(201).json({ success: true, data: experience });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});


const updateExperience = asyncHandler(async (req, res) => {
    try {
        const { experienceId } = req.params;
        const { experienceTitle, experienceDescription } = req.body;

        // Check if required fields are present
        if (!experienceTitle || !experienceDescription) {
            return res.status(400).json({ success: false, error: "Experience title and description are required" });
        }

        let updateFields = { experienceTitle, experienceDescription };

        // Check if a file was uploaded
        if (req.file) {
            // Construct the file path
            const experienceImage = req.file.path;
            updateFields.experienceImage = experienceImage;
        }

        // Update the experience
        const updatedExperience = await Experience.findByIdAndUpdate(experienceId, updateFields, { new: true });

        if (!updatedExperience) {
            return res.status(404).json({ success: false, error: "Experience not found" });
        }

        // Delete old image if it exists
        const oldExperience = await Experience.findById(experienceId);
        if (oldExperience && oldExperience.experienceImage) {
            fs.unlinkSync(oldExperience.experienceImage);
        }

        res.status(200).json({ success: true, data: updatedExperience });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});



const getAllExperiences = asyncHandler(async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json({ success: true, data: experiences });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteExperience = asyncHandler(async (req, res) => {
    try {
        const { experienceId } = req.params;

        // Find the experience to delete and get the image path
        const experienceToDelete = await Experience.findById(experienceId);
        const imagePath = experienceToDelete?.experienceImage;

        const deletedExperience = await Experience.findByIdAndDelete(experienceId);

        if (!deletedExperience) {
            return res.status(404).json({ success: false, error: "Experience not found" });
        }

        // Attempt to delete the image file
        if (imagePath) {
            try {
                fs.unlinkSync(imagePath);
                console.log('Image file deleted successfully.');
            } catch (err) {
                console.error('Error deleting image file:', err);
            }
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});



module.exports = {upload, createExperience, updateExperience, getAllExperiences, deleteExperience}