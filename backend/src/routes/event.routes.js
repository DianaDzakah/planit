import express from "express"
import {createNewEvent,getEvents} from "../controllers/event.controllers.js"

const router =express.Router()

router.post("/", createNewEvent)

router.get("/", getEvents)









export default router;