const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
    },
    mainDescription: {
        type: String,
    },
    processCard: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            // required: true
        }
    }]  
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Process", processSchema);
