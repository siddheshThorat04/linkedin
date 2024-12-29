import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import cookieParser from "cookie-parser"
export const signup = async (req, res) => {
    // res.send("heyy from signup")
    try {
        const { name, username, email, password } = req.body
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email Alredy Exist" })
        }
        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: "Username Alredy Taken" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be more than 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            username
        })
        await user.save()
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.cookie("jwt-linkedin", token, {
            httpOnly: true, //prevent xss attack
            sameSite: "strict",  // prevents csrf attack
            secure: process.env.NODE_ENV === "production"//prevent man-in-the-middle attck 

        })
        res.json({ message: "User Registered Successfully" })
    } catch (error) {
        console.log(`Problem occured:${error}`)
    }

}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.cookie("jwt-linkedin", token, {
            httpOnly: true, //prevent xss attack
            sameSite: "strict",  // prevents csrf attack
            secure: process.env.NODE_ENV === "production"//prevent man-in-the-middle attck 

        })
        res.json({ message: "User Logged in Successfully" })
    } catch (error) {
        console.log(`Problem occured:${error}`)
    }

}
export const logout = (req, res) => {
    res.clearCookie("jwt-linkedin")
    res.json({ message: "Logout Successful" })
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user
        res.json(user)
    } catch (error) {
        console.log(`Problem occured:${error}`)
    }
}
