const mongoose = require("mongoose");

const contactfromSchema = new mongoose.Schema({
    category: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("ContactForm", contactfromSchema);
