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

// Define User model
const User = model("User", userSchema);

// Export models
export default User;
