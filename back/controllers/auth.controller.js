/**
 * Controller for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
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

    UserModel.countDocuments({pseudo: newUser.pseudo}, function (err, count){
        if (err) return res.status(401).json({msg:"Error"});
        if (count > 0) {
            return res.status(409).json({msg: "This pseudo already exists"});
        }
        else {
            newUser.save().then((error, user)=>{
                if(error) return console.error(error);
                req.session.userId = user._id;
                return res.status(200).json({ user: user._id, firstName: user.firstName, lastName: user.lastName});
            });
        }
    });
}


/**
 * Log In a user and create a cookie if log in is successful
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.signIn = async (req, res) => {
    //const { pseudo, password } = req.body
    //const user = await UserModel.login(pseudo, password);
    //const user = await UserModel.findOne({ pseudo: pseudo });
    UserModel.findOne({pseudo: req.body.pseudo, password: req.body.password}, (error, user) =>{
        if (error) return res.status(401).json({msg: "Error"});
        if (!user) return res.status(401).json({msg: "Wrong login"});
        req.session.userId = user._id;
        return res.status(200).json({ user: user._id, firstName: user.firstName, lastName: user.lastName});
    });

/*    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            res.status(200).json({ user: user._id, firstName: user.firstName, lastName: user.lastName})
        }
        res.status(409).json({msg: "Incorrect password" });
    }
    res.status(409).json({msg: "Incorrect pseudo" });*/
/*        const token = createToken(user._id);
        req.session.userId = user._id;
        res.cookie('jwt', token, { httpOnly: true, maxAge});
    } catch (err) {
        const errors = signInErrors(err);
    }*/
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
    //res.cookie('jwt', '', { maxAge: 1 });
    //res.redirect('/');
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