/**
 * Router for Events
 * @author Hugo Vialle
 * @date 16/11/2021
 */

const router = require('express').Router()
const eventController = require('../controllers/event.controller');
const {requireAuth} = require('../middleware/auth.middleware');

router.post("/add", eventController.addEvent);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);

router.get("/pagination/:size/:page", eventController.getAllByPage);
router.get("/", eventController.getAllEvents);
router.get("/date/:date", eventController.getEventByDate);
router.get("/user/:id", requireAuth, eventController.getEventByUserId);
router.delete("/:id", requireAuth, eventController.deleteEvent);

module.exports = router;