import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-linkedin"]
        

        if(!token){
            return res.status(401).json({message:"Unauthorized token not found"})
        }

        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorized not decoded"})
        }
        const user=await User.findById(decoded.userId)
        if(!user){ 
            return res.status(401).json({message:"Unauthorized user not found"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware",error)
        res.status(401).json({message:"Unauthorized last"})

    }


}