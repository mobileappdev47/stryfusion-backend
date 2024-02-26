const mongoose = require("mongoose");

const possibleSchema = new mongoose.Schema({
    possibleTitle: {
        type: String
    },
    possibleDescription: {
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Possible", possibleSchema);
