import express from "express";
import {
	createNewEvent,
	getEvents,
	deleteEvents,
} from "../controllers/event.controllers.js";

const router = express.Router();

router.post("/", createNewEvent);

router.get("/", getEvents);

router.get("/", deleteEvents);

export default router;
