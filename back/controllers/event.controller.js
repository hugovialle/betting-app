/**
 * Controller for Events
 * @author Hugo Vialle
 * @date 16/11/2021
 */

const EventModel = require('../models/event.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getEventByDate = async (req, res) => {
    try{
        const event = await EventModel.find({ date: req.params.date}).select().sort();
        res.status(200).json(event);
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.getEventById = async (req, res) => {
    try{
        const event = await EventModel.find({ _id: req.params.id}).select();
        res.status(200).json(event);
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.getAllEvents = async (req, res) => {
    const events = await EventModel.find({}).select();
    res.status(200).json(events);
}

module.exports.addEvent = async (req, res) => {
    const {date, title, sport, peopleCount, place_id, creator_id, participants_id} = req.body
    const dateX = new Date();
    const x = "619576cbcd35a76c1e629988";
    try{
        const event = await EventModel.create({date: dateX, title: req.body.title, sport: req.body.sport, peopleCount: req.body.peopleCount, place_id: req.body.place_id, creator_id: x, participants_id: []});
        res.status(200).json({event: event._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.deleteEvent = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : "+ req.params.id);

    try {
        await EventModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. "});
    } catch(err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.updateEvent = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await EventModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    /*isBooked: req.body.isBooked,
                    firstName: req.body.firstName,
                    familyName: req.body.lastName,
                    phone: req.body.phone,*/
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};