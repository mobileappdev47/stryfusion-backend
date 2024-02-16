const mongoose = require("mongoose");

const ourbrandsSchema = new mongoose.Schema({
    brandImages: [{
        type: String,
        required: true
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("OurBrands", ourbrandsSchema);
