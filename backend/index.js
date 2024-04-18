import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import eventRoutes from "./src/routes/event.routes.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors);
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.listen(4000, () => console.log("server running on port 4000"));
