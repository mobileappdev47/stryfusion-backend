const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    experienceTitle: {
        type: String,
        required: true
    },
    experienceDescription: {
        type: String,
        required: true
    },
    experienceImage: {
        type: String,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Experience", experienceSchema);
