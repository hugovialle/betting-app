/**
 * Model for Users
 * @author Hugo Vialle
 * @date 14/11/2021
 */

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        fields: {
            equnom: String,
            comlib: String,
            actlib: String,
            insnovoie: String,
            inslibellevoie: String,
            inscodepostal: String,
            equgpsx: Number,
            equgpsy: Number
        },
        record_timestamp: Date,
    }
);

const LocationModel = mongoose.model("locations", locationSchema);

module.exports = LocationModel;