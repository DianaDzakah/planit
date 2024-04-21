import User from "../models/user.model.js";

const registerNewUser = async (req, res) => {
	console.log("register a new user");

	const { firstName, lastName, email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (user) {
			return res.status(409).json({
				status: failed,
				message: "account already exists",
			});
		}
	} catch (error) {}
};

const loginUser = (req, res) => {
	console.log("log in user");
};

const displayUserProfile = (req, res) => {
	console.log("display user profile");
};

export { registerNewUser, loginUser, displayUserProfile };
