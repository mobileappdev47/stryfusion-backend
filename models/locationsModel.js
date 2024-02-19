const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
    locationname:{
        type: String
    },
    coordinates:{
        lat: {
            type: String,
        },
        long: {
            type: String
        }
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Locations", locationsSchema);
