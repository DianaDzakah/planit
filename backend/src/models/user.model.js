// Import mongoose
import mongoose from "mongoose";
import validator from "validator";

// Destructure mongoose objects
const { Schema, model } = mongoose;

// Define the User schema
const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("email is invalid");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error(
					"invalid password, password cannot contain the word 'password'"
				);
			}
		},
	},
});

// Define User model
const User = model("User", userSchema);

// Export models
export default User;
