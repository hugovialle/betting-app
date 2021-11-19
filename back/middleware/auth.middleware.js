/**
 * Middleware for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            } else {
                req.userId = decodedToken.id;
                next();
            }
        });
    } else {
        return res.status(403).send({message: "No token provided!"});
    }
}