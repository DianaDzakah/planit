import express from "express";
import {
	createNewEvent,
	getEvents,
	deleteEvent,
	updateEvent,
	// exportCalendar,
} from "../controllers/event.controllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createNewEvent);

router.get("/", auth, getEvents);

// router.get("/export", auth, exportCalendar);

router.patch("/:id", auth, updateEvent);

router.delete("/:id", auth, deleteEvent);

export default router;
