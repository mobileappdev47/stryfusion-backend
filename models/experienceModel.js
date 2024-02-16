const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
        required: true
    },
    mainDescription: {
        type: String,
        required: true
    },
    card: [{
        image: {
            type: String,
            required: true
        },
        cardTitle: {
            type: String,
            required: true
        },
        cardDescription: {
            type: String,
            required: true
        },
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Experience", experienceSchema);
