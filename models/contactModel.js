const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
        required: true
    },
    mainDescription: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Contact", contactSchema);
