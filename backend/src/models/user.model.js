// Import mongoose
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
	token: {
		type: String,
		required: true,
	},
});

userSchema.virtual("events", {
	ref: "Event",
	localField: "_id",
	foreignField: "user",
});

userSchema.methods.toJSON = function () {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.token;

	return userObject;
};

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	next();
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;

	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	user.token = token;

	await user.save();

	return token;
};

userSchema.statics.findByCredentials = async ({ email, password }) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("invalid email or password");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("invalid email or password");
	}

	return user;
};

// Define User model
const User = model("User", userSchema);

// Export models
export default User;
