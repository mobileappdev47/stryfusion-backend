const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    clientImage: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientRole: {
        type: String,
        required: true
    },
    clientReview: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Client", clientSchema);
