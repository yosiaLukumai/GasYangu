const mongoose = require("mongoose")

const data = mongoose.Schema({
    deviceId: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true
    },
    ReminderValue: {
        type: Number,
        required: true
    },
    GasSize: {
        type: Number,
        required: true
    }

  
}, {
    timestamps: true
})



     

module.exports = mongoose.model("data", data)
