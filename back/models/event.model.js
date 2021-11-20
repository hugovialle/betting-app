/**
 * Model for Users
 * @author Hugo Vialle
 * @date 14/11/2021
 */

const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const eventSchema = new mongoose.Schema(
    {
        date: Date,
        title: String,
        sport: {type: String, enum: ["Football", "Running", "Basketball", "Tennis"]},
        peopleCount: { type: Number, min: 1, max: 29 },
        arrondissement: String,
        place_id: {type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'},
        creator_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        participants_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
    }
);

eventSchema.plugin(mongoosePaginate);

/*eventSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
});*/


const EventModel = mongoose.model("events", eventSchema);

module.exports = EventModel;