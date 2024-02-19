const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    },
    productImage: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Products", productsSchema);
