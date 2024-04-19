// Import mongoose
import mongoose from "mongoose";

// Destructure mongoose objects
const { Schema, model } = mongoose;

// Define the User schema
const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Define the Event schema
const eventSchema = new Schema({
	userId: {
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

// Define User model
const User = model("User", userSchema);

// Define Event model
const Event = model("Event", eventSchema);

// Export models
export { User, Event };
