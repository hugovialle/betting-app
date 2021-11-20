/**
 * Router for Events
 * @author Hugo Vialle
 * @date 16/11/2021
 */

const router = require('express').Router()
const locationController = require('../controllers/location.controller');

router.get("/", locationController.getAllLocations);
router.get("/:actlib", locationController.getByActivityType);
router.get("/arrondissement/:inscodepostal", locationController.getByArrondissement);
router.get("/id/:id", locationController.getById);

module.exports = router;