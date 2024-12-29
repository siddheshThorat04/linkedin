import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.route.js'
import userRoutes from './Routes/user.route.js'
import postRoutes from './Routes/post.route.js'
import connectionRoutes from './Routes/connection.route.js'
import cors from 'cors'
import { connectDb } from './lib/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
const port = process.env.PORT
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/connections", connectionRoutes)




app.listen(port, () => {
  console.log("Server Running on http://localhost:3000")
  connectDb()
}
)
