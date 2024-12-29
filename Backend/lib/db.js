import mongoose from "mongoose";

export const connectDb= async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database Connected ✅`)
  } catch (error) {
    console.log(`Something Went Wrong:${error.message}`)
    process.exit(1)
  }
}
