const mongoose = require("mongoose");

const playerinfoSchema = mongoose.Schema({
    userID: { type: String },
    username: { type: String },
    starterchoosen: { type: Boolean, default: false },
    startername: { type: String },
    numberofpokes: { type: Number }
});

module.exports = mongoose.model("Playerinfo", playerinfoSchema);