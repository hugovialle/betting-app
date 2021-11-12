const router = require('express').Router()
const authController = require('../controllers/auth.controller');

router.post("/user/login", authController.signIn);
router.post("/user/logout", authController.logout);
router.post("/user/register", authController.addUser);