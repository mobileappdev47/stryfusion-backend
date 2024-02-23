const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel')
const ContactForm = require('../models/contactFormModel')
const nodemailer = require("nodemailer");
const sendEmail = require('../utils/email')

const createContact = asyncHandler(async (req, res) => {
    try {
        const existingContact = await Contact.findOne();
        if (existingContact) {
            return res.status(400).json({ success: false, code: 400, message: "Contact details already exist" });
        }

        const { mainTitle, mainDescription, email, phone, address } = req.body;

        // Check if required fields are present
        if (!mainTitle || !mainDescription || !email || !phone || !address) {
            return res.status(400).json({ success: false, code: 400, message: "All contact fields are required" });
        }

        // Create the contact details
        const contact = await Contact.create({
            mainTitle,
            mainDescription,
            email,
            phone,
            address
        });

        res.status(201).json({ success: true, code: 201, data: contact });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const getContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findOne();
        if (!contact) {
            return res.status(404).json({ success: false, code: 404, message: "Contact details not found" });
        }
        res.status(200).json({ success: true, code: 200, data: contact });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
});


const updateContact = asyncHandler(async (req, res) => {
    try {
        const existingContact = await Contact.findOne();
        if (!existingContact) {
            return res.status(404).json({ success: false, code: 404, message: "Contact details not found" });
        }

        const { mainTitle, mainDescription, email, phone, address } = req.body;

        // Check if required fields are present
        if (!mainTitle || !mainDescription || !email || !phone || !address) {
            return res.status(400).json({ success: false, code: 400, message: "All contact fields are required" });
        }

        // Update the contact details
        const updatedContact = await Contact.findOneAndUpdate({}, {
            mainTitle,
            mainDescription,
            email,
            phone,
            address
        }, { new: true });

        res.status(200).json({ success: true, code: 200, data: updatedContact });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const deleteContact = asyncHandler(async (req, res) => {
    try {
        const existingContact = await Contact.findOne();
        if (!existingContact) {
            return res.status(404).json({ success: false, code: 404, message: "Contact details not found" });
        }

        const deletedContact = await Contact.findOneAndDelete();
        res.status(200).json({ success: true, code: 200, data: {} });
    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
});


const contactFormSubmit = asyncHandler(async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Check if required fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required fields" });
        }

        // Call sendEmail function to send the email
        await sendEmail({
            to: email,
            subject: "Thank you for contacting us",
            text: `Dear ${name},\n\nWe have received your message and will get back to you soon. from stryker fusion`,
            html: `<p>Dear ${name},</p><p>We have received your message and will get back to you soon. stryker fusion</p>`,
        });

        // If email sending is successful, send a success response
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error:", error);
        // Send an error response with a more descriptive message
        res.status(500).json({ message: "Failed to send email. Please try again later." });
    }
});


module.exports = { createContact, getContact, updateContact, deleteContact, contactFormSubmit }