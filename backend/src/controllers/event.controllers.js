import mongoose from "mongoose";
import ical, { ICalCalendarMethod } from "ical-generator";
import Event from "../models/event.model.js";

const createNewEvent = async (req, res) => {
	const newEvent = new Event({
		user: req.user._id,
		title: req.body.title,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
	});

	try {
		const event = await newEvent.save();

		const eventData = await event.populate("user");

		res.status(201).json({
			status: "success",
			data: eventData,
			message: "Congratulations your event created successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred ",
		});
	}
};

const getEvents = async (req, res) => {
	console.log("getting all events", req.user._id);
	try {
		const events = await Event.find({ user: req.user._id }).populate("user");
		res.status(200).json({
			status: "success",
			message: "events retrieved successfully",
			data: events,
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

const exportCalendar = async (req, res) => {
	console.log("exporting calendar");

	const eventId = req.params.id;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				status: "failed",
				message: "sorry event not found",
			});
		}

		const calendar = ical({ name: event.title });
		calendar.method(ICalCalendarMethod.REQUEST);

		calendar.createEvent({
			start: event.startDate,
			end: event.endDate,
			summary: event.title,
		});

		res.writeHead(200, {
			"Content-Type": "text/calendar; charset=utf-8",
			"Content-Disposition": 'attachment; filename="calendar.ics"',
		});

		console.log("calendar", calendar);

		// res.status(200).json({});

		res.end(calendar.toString());
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

const updateEvent = async (req, res) => {
	const _id = req.params.id;

	if (!mongoose.isValidObjectId(_id)) {
		return res.status(400).json({
			status: "failed",
			message: "invalid objectId",
		});
	}

	console.log("update single event");

	const updates = Object.keys(req.body);

	const allowedUpdates = ["title", "startDate", "endDate"];

	const isallowedUpdate = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isallowedUpdate) {
		return res.status(400).json({
			status: "failed",
			message: "invalid update",
		});
	}

	try {
		const event = await Event.findById(_id);
		if (!event) {
			return res.status(404).json({
				status: "failed",
				message: "event not found",
			});
		}

		updates.forEach((update) => {
			event[update] = req.body[update];
		});
		await event.save();

		res.status(200).json({
			status: "success",
			message: "event updated successfully",
			data: event,
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry failed to update event",
		});
	}
};

const deleteEvent = async (req, res) => {
	const _id = req.params.id;

	// console.log(`delete single Event with id ${_id}`);
	if (!mongoose.isValidObjectId(_id)) {
		return res.status(400).json({
			status: "failed",
			message: "invalid objectId",
		});
	}

	try {
		const event = await Event.findById(_id);
		console.log("event", event);
		if (event) {
			await event.deleteOne();
			res.status(200).json({
				status: "success",
				message: "event deleted successfully",
			});
		} else {
			res.status(404).json({
				status: "failed",
				message: "event not found",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

export { createNewEvent, getEvents, deleteEvent, updateEvent, exportCalendar };
