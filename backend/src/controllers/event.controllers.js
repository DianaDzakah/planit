import Event from "../models/event.model.js";

const createNewEvent = async (req, res) => {
	const event = new Event({
		title: req.body.title,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
	});

	try {
		await event.save();

		res.status(201).json({
			status: "success",
			data: event,
			message: "Congratulations your event created successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred ",
		});
	}
};

const getEvents = (req, res) => {
	console.log("getting all events");
};

const updateEvent = (req, res) => {
	console.log("update single event");
};

const deleteEvent = async (req, res) => {
	const _id = req.params.id;

	console.log(`delete single Event with id ${_id}`);

	try {
		const event = await Event.findById(_id);
		if (event) {
			await event.remove();
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
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

export { createNewEvent, getEvents, deleteEvent, updateEvent };
