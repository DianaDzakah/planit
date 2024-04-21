import express from "express";
import {
	registerNewUser,
	loginUser,
	displayUserProfile,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerNewUser);

router.post("/login", loginUser);

router.get("/profile", auth, displayUserProfile);

export default router;
