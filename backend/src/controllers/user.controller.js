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
			data: { newUser, token },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			message: "sorry an error occurred",
		});
	}
};

const loginUser = (req, res) => {
	console.log("log in user");
};

const displayUserProfile = (req, res) => {
	console.log("display user profile");
};

export { registerNewUser, loginUser, displayUserProfile };
