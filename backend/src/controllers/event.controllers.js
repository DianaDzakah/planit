const createNewEvent = (req, res) => {
	console.log("created a new event");
};

const getEvents = (req, res) => {
	console.log("getting all events");
};

const updateEvent = (req, res) => {
	console.log("update single event");
};

const deleteEvent = (req, res) => {
	const _id = req.params.id;
	console.log(`delete single Event with id ${_id}`);
};

export { createNewEvent, getEvents, deleteEvent, updateEvent };
