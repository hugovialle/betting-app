/**
 * Controller for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
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
    const newUser = new UserModel({
        pseudo: req.body.pseudo,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    let user = await UserModel.findOne({ pseudo: req.body.pseudo });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet

        await newUser.save(function(error, user){
            if(error){
                return res.status(409).send({ message: error });
            }

            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 10400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                pseudo: user.pseudo,
                email: user.email,
                accessToken: token
            });

        });
    }
}


/**
 * Log In a user and create a cookie if log in is successful
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.signIn = async (req, res) => {
    UserModel.findOne({
        pseudo: req.body.pseudo
    })

        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: 10400 // 24 hours
            });

            res.status(200).send({
                _id: user._id,
                pseudo: user.pseudo,
                email: user.email,
                accessToken: token
            });
        });
}

/**
 * Log Out the user by reducing the jwt token to the minimum time possible
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.logout = async (req, res) => {
    req.session.destroy(error => {
        if(error)
            return res.status(409).json({msg: "error"});
        res.status(200).json({msg: "Successfully logged out"})
    })
}

/**
 * Send user info if the user is connected
 */
module.exports.isLogged = async (req,res) => {
    if(!req.session.userId) return res.status(401).json();

    UserModel.findOne({ _id: req.session.userId}, (error, user) => {
        if (error || !user) return res.status(401).json({msg: "Error"});
        req.session.userId = user._id;
        res.status(200).json({ user: user._id, firstName: user.firstName, lastName: user.lastName});
    });
}
