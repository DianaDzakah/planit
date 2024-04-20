import express from "express";
import {
	createNewEvent,
	getEvents,
	deleteEvent,
	updateEvent,
} from "../controllers/event.controllers.js";

const router = express.Router();

router.post("/", createNewEvent);

router.get("/", getEvents);

router.patch("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
