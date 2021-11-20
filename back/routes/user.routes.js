/**
 * Router for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const router = require('express').Router()
const authController = require('../controllers/auth.controller');
const locationController = require('../controllers/location.controller');

/*
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.post("/register", authController.addUser);
router.get("/islogged", authController.isLogged);

module.exports = router;*/
module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/user/login", authController.signIn);
    app.get("/api/user/logout", authController.logout);
    app.post("/api/user/register", authController.addUser);
    app.get("/api/user/islogged", authController.isLogged);
}