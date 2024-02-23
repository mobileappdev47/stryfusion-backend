const asyncHandler = require('express-async-handler');
const ExperienceMain = require('../models/experiencemainModel');


const createExperienceMain = asyncHandler(async (req, res) => {
    try {
        const { experienceTitle, experienceDescription } = req.body;

        // Check if any experience already exists
        const existingExperience = await ExperienceMain.findOne();

        if (existingExperience) {
            return res.status(400).json({ success: false, code: 400, message: "An experience already exists, only one experience can be created" });
        }

        // Check if required fields are present
        if (!experienceTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Experience title is required" });
        }

        // Create the experience
        const experience = await ExperienceMain.create({
            experienceTitle,
            experienceDescription // This field can be null or undefined if not provided
        });

        res.status(201).json({ success: true, code: 201, data: experience });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

const updateExperienceMain = asyncHandler(async (req, res) => {
    try {
        const { experienceId } = req.params;
        const { experienceTitle, experienceDescription } = req.body;

        // Check if required fields are present
        if (!experienceTitle) {
            return res.status(400).json({ success: false, code: 400, message: "Experience title is required" });
        }

        let updateFields = { experienceTitle, experienceDescription };

        // Update the experience
        const updatedExperience = await ExperienceMain.findByIdAndUpdate(experienceId, updateFields, { new: true });

        if (!updatedExperience) {
            return res.status(404).json({ success: false, code: 404, message: "Experience not found" });
        }

        res.status(200).json({ success: true, code: 200, data: updatedExperience });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

const getExperienceMain = asyncHandler(async (req, res) => {
    try {
        const experiences = await ExperienceMain.findOne();

        // If no experience main data is found, return a success response with a blank object
        if (!experiences) {
            return res.status(200).json({ success: true, code: 200, data: {} });
        }

        // If experience main data is found, return it in the response
        res.status(200).json({ success: true, code: 200, data: experiences });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});

const deleteExperienceMain = asyncHandler(async (req, res) => {
    try {
        const { experienceId } = req.params;

        const deletedExperience = await ExperienceMain.findByIdAndDelete(experienceId);

        if (!deletedExperience) {
            return res.status(404).json({ success: false, code: 404, message: "Experience not found" });
        }

        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});

module.exports = { createExperienceMain, getExperienceMain, updateExperienceMain, deleteExperienceMain };
