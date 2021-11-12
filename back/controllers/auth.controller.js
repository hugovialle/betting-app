const AppointmentModel = require('../models/appointment.model');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signInErrors } = require("../utils/error.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.addUser = async (req, res) => {
    const {pseudo, password} = req.body

    try{
        const user = await UserModel.create({pseudo, password});
        res.status(200).json({user: user._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.signIn = async (req, res) => {
    const { pseudo, password } = req.body

    try {
        const user = await UserModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id})
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({ errors });
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}