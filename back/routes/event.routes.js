/**
 * Router for Events
 * @author Hugo Vialle
 * @date 16/11/2021
 */

const router = require('express').Router()
const eventController = require('../controllers/event.controller');
const {requireAuth} = require('../middleware/auth.middleware');

router.post("/add", requireAuth, eventController.addEvent);

router.put("/:id", eventController.updateEvent);

router.get("/", eventController.getAllEvents);
router.get("/:date", eventController.getByDate);
router.delete("/:id", requireAuth, eventController.deleteEvent);

module.exports = router;