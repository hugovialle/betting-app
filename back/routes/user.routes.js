/**
 * Router for Users
 * @author Hugo Vialle
 * @date 11/11/2021
 */

const router = require('express').Router()
const authController = require('../controllers/auth.controller');

router.post("/user/login", authController.signIn);
router.post("/user/logout", authController.logout);
router.post("/user/register", authController.addUser);

module.exports = router;