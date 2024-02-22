const mongoose = require("mongoose");

const experiencemainSchema = new mongoose.Schema({
    experienceTitle:{
        type: String
    },
    experienceDescription:{
        type: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("ExperienceMain", experiencemainSchema);
