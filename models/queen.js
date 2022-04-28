const mongoose = require("mongoose")
const queenSchema = mongoose.Schema({
    queen_name: String,
    queen_country: String,
    networth: { 
        type: Number, 
        min:1500000, 
        max:2900000
    }
})
module.exports = mongoose.model("Queen", queenSchema)