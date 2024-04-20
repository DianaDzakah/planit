import express from "express";
import {
	registerNewUser,
	loginUser,
	displayUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerNewUser);

router.post("/login", loginUser);

router.get("/profile", displayUserProfile);

export default router;
