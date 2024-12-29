import express from "express";
import {protectRoute} from "../middlewares/auth.middlewares.js";
import  {deletePost,getFeedPosts,createPost,getPostById,createComment,likePost}  from "../controllers/post.controller.js";



const router=express.Router()       

router.get("/",protectRoute,getFeedPosts)
router.post("/create",protectRoute,createPost)
router.delete("/delete/:id",protectRoute,deletePost)
router.get("/:id",protectRoute,getPostById)
router.post("/:id/comment",protectRoute,createComment)
router.post("/:id/like",protectRoute,likePost)


export default router