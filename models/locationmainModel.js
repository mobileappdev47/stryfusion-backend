const mongoose = require("mongoose");

const locationmainSchema = new mongoose.Schema({
    locationTitle:{
        type: String
    },
    locationDescription:{
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("LocationMain", locationmainSchema);
