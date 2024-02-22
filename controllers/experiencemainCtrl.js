const asyncHandler = require('express-async-handler');
const ExperienceMain = require('../models/experiencemainModel');


const createExperienceMain = asyncHandler(async (req, res) => {
    try {
        const { experienceTitle, experienceDescription } = req.body;

        // Check if required fields are present
        if (!experienceTitle) {
            return res.status(400).json({ success: false, error: "Experience title is required" });
        }

        // Check if experience with the same title already exists
        const existingExperience = await ExperienceMain.findOne({ experienceTitle });

        if (existingExperience) {
            return res.status(400).json({ success: false, error: "Experience with this title already exists" });
        }

        // Create the experience
        const experience = await ExperienceMain.create({
            experienceTitle,
            experienceDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, data: experience });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const updateExperienceMain = asyncHandler(async (req, res) => {
    try {
        const { experienceId } = req.params;
        const { experienceTitle, experienceDescription } = req.body;

        // Check if required fields are present
        if (!experienceTitle) {
            return res.status(400).json({ success: false, error: "Experience title is required" });
        }

        let updateFields = { experienceTitle, experienceDescription };

        // Update the experience
        const updatedExperience = await ExperienceMain.findByIdAndUpdate(experienceId, updateFields, { new: true });

        if (!updatedExperience) {
            return res.status(404).json({ success: false, error: "Experience not found" });
        }

        res.status(200).json({ success: true, data: updatedExperience });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

const getExperienceMain = asyncHandler(async (req, res) => {
    try {
        const experiences = await ExperienceMain.find();
        res.status(200).json({ success: true, data: experiences });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const deleteExperienceMain = asyncHandler(async (req, res) => {
    try {
        const { experienceId } = req.params;

        const deletedExperience = await ExperienceMain.findByIdAndDelete(experienceId);

        if (!deletedExperience) {
            return res.status(404).json({ success: false, error: "Experience not found" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = { createExperienceMain, getExperienceMain, updateExperienceMain, deleteExperienceMain };
