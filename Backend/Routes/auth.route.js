import express from "express";
import { login,signup,logout,getCurrentUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
const router=express.Router()

router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.get("/profile",protectRoute,getCurrentUser)

export default router