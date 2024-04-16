import mongoose from "mongoose";

const connectDB = async () => {
	const uri = process.env.MONGO_URI;

	try {
		await mongoose.connect(uri, {
		});

		console.log("mongodb connected successfully");
	} catch (error) {
		console.log(`error occured during connection to mongodb. ERROR:${error}`);
	}
};
export default connectDB;
