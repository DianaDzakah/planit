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

router.patch("/", updateEvent);

router.get("/:id", deleteEvent);

export default router;
