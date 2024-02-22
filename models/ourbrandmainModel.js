const mongoose = require("mongoose");

const ourbrandmainSchema = new mongoose.Schema({
    brandTitle: {
        type: String
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("OurbrandMain", ourbrandmainSchema);
