const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
    lcoation: [{
        type: String,
        required: true
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Locations", locationsSchema);
