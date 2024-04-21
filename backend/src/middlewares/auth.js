import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");

		const decode = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ _id: decode._id, token });

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;

		next();
	} catch (error) {
		res.status(401).json({
			status: "failed",
			message: "please create an account to continue",
		});
	}
};
export default auth;
