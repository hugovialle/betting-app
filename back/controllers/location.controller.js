/**
 * Controller for Events
 * @author Hugo Vialle
 * @date 16/11/2021
 */

const LocationModel = require('../models/location.model.js');

module.exports.getAllLocations = async (req, res) => {
    const locations = await LocationModel.find({});
    res.status(200).json(locations);
}

module.exports.getByActivityType = async (req, res) => {
    const locations = await LocationModel.find({ "fields.actlib": req.params.actlib});
    res.status(200).json(locations);
}

module.exports.getByArrondissement = async (req, res) => {
    const locations = await LocationModel.find({ "fields.inscodepostal": req.params.inscodepostal});
    res.status(200).json(locations);
}

module.exports.getById = async (req, res) => {
    const location = await LocationModel.find({_id: req.params.id});
    res.status(200).json(location);
}