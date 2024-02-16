const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
        required: true
    },
    mainDescription: {
        type: String,
        required: true
    },
    products: [{
        productTitle: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Products", productsSchema);
