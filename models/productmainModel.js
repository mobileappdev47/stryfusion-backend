const mongoose = require("mongoose");

const productmainSchema = new mongoose.Schema({
    productTitle:{
        type: String
    },
    productDescription:{
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("ProductMain", productmainSchema);
