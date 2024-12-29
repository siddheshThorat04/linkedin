import express from "express";
import  {protectRoute}  from "../middlewares/auth.middlewares.js";
import {getUserSuggestions,getPublicProfile}  from "../controllers/user.controller.js";
import {updateProfile} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/suggestions",protectRoute,getUserSuggestions)
router.get("/:username",protectRoute,getPublicProfile)
router.put("/profile",protectRoute,updateProfile)

export default router