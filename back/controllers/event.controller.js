/**
 * Controller for Events
 * @author Hugo Vialle
 * @date 16/11/2021
 */

const EventModel = require('../models/event.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

module.exports.getAllByPage = async (req, res) => {
    const { page, size } = req.params;
    const arrondissement = req.query.arrondissement;
    const sport = req.query.sport;
    const { limit, offset } = getPagination(page, size);
    let query={};
    if(arrondissement){
        query.arrondissement={ $regex: new RegExp(arrondissement), $options: "i" }
    }
    if(sport){
        query.sport={ $regex: new RegExp(sport), $options: "i" }
    }

    let options = {
        populate: 'events',
        sort: ({ date: 1 })
    };

    const events = EventModel.paginate(query , { page: req.params.page, limit: req.params.size })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                events: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

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

module.exports.getEventByUserId = async (req, res) => {
    try{
        const event = await EventModel.find({
            $or: [{
                creator_id: req.params.id
            }, {
                participants_id: { $elemMatch: { $eq: req.params._id}}
            }]
        }).select();
        res.status(200).json(event);
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.addEvent = async (req, res) => {
    const {date, title, sport, peopleCount,arrondissement, place_id, creator_id, participants_id} = req.body
    const dateX = new Date();
    try{
        const event = await EventModel.create({date: dateX, title: req.body.title, sport: req.body.sport, peopleCount: req.body.peopleCount, arrondissement: req.body.arrondissement, place_id: req.body.place_id, creator_id: req.body.creator_id, participants_id: []});
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

