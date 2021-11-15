/**
 * Controller for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signInErrors } = require("../utils/error.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

/**
 * Create a new user in the DB.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.addUser = async (req, res) => {
    const {pseudo, password, firstName, lastName, email} = req.body

    try{
        const user = await UserModel.create({pseudo, password, firstName, lastName, email});
        res.status(200).json({user: user._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

/**
 * Log In a user and create a cookie if log in is successful
 * @param req
 * @param res
 * @return {Promise<void>}
 */
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

/**
 * Log Out the user by reducing the jwt token to the minimum time possible
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}