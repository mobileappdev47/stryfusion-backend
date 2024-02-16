const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Home", homeSchema);
