/**
 * Router for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const router = require('express').Router()
const authController = require('../controllers/auth.controller');
const locationController = require('../controllers/location.controller');

router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.post("/register", authController.addUser);
router.get("/islogged", authController.isLogged);

module.exports = router;