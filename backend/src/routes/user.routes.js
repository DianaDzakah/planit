import express from "express";
import {registerNewUser,loginUser,displayUserProfile
} from "../controllers/user.controller.js";


const router = express.Router();

router.post=("/",registerNewUser)

router.post=("/",loginUser)

router.get=("/",displayUserProfile)



export default router;
