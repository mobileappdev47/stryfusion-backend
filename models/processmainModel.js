const mongoose = require("mongoose");

const processmainSchema = new mongoose.Schema({
    processTitle:{
        type: String
    },
    processDescription:{
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("ProcessMain", processmainSchema);
