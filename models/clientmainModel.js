const mongoose = require("mongoose");

const clientmainSchema = new mongoose.Schema({
    clientTitle: {
        type: String
    },
    clientDescription: {
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("ClientMain", clientmainSchema);
