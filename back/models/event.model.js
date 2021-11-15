/**
 * Model for Users
 * @author Hugo Vialle
 * @date 14/11/2021
 */

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        date: Date,
        title: String,
        sport: {type: String, enum: ["Football", "Running", "Basketball", "Tennis"]},
        peopleCount: { type: Number, min: 1, max: 29 },
        place_id: {type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'},
        creator_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        participants_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
    }
);

const EventModel = mongoose.model("events", eventSchema);

module.exports = EventModel;