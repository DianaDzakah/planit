import User from "../models/user.model.js";

const registerNewUser = async (req, res) => {
	console.log("register a new user");

	const { firstName, lastName, email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (user) {
			return res.status(409).json({
				status: "failed",
				message: "account already exists",
			});
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
		});

		const token = await newUser.generateAuthToken();

		await newUser.save();

		res.status(201).json({
			status: "success",
			message: "your acount has been created successfully",
			data: { user: newUser, token },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

const loginUser = async (req, res) => {
	console.log("log in user");
	try {
		const user = await User.findByCredentials(req.body);
		const token = await user.generateAuthToken();

		res.status(200).json({
			status: "success",
			message: "login successful",
			data: { user, token },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: error.message,
		});
	}
};

const displayUserProfile = (req, res) => {
	console.log("display user profile");
	try {
		res.status(200).json({
			status: "success",
			message: "your profile was successfully retrieved",
			data: req.user,
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

export { registerNewUser, loginUser, displayUserProfile };
