const mongoose = require("mongoose")
const queenSchema = mongoose.Schema({
    queen_name: String,
    queen_country: String,
    networth: Number
})
module.exports = mongoose.model("Queen", queenSchema)