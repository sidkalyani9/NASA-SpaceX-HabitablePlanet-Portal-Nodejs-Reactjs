const mongoose = require('mongoose')

const launchesSchema = mongoose.Schema({
    // flightNumber: Number,
    flightNumber: {
        type: Number,
        required: true,
        min: 1,
        max:9999
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    destination: {
        type: String,
        required: true,
    },
    customer: [String],
    upcoming: {
        type: Boolean,
        reqquired: true,
        default: true,
    },
    success: {
        type: Boolean,
        reqquired: true,
        default: true,
    }
})

module.exports = mongoose.model('Launch', launchesSchema)