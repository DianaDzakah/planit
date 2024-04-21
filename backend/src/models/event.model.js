// Import mongoose
import mongoose from "mongoose";

// Destructure mongoose objects
const { Schema, model } = mongoose;

// Define the Event schema
const eventSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
});

// Define Event model
const Event = model("Event", eventSchema);

// Export models
export default Event;
