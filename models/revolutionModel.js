const mongoose = require("mongoose");

const revolutionSchema = new mongoose.Schema({
    revolutionTitle: {
        type: String
    },
    revolutionDescription: {
        type: String
    },
    revolutionContent: {
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Revolution", revolutionSchema);
