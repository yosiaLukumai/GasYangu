const mongoose = require("mongoose")
const stats = mongoose.Schema({
    status: {
        type: Boolean,
    },
    temp: {
        type : String,
        required : true
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("stats", stats)
