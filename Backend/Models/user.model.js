import mongoose from "mongoose";
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    bannerImage:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:"Linked User"
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        default:"Earth"
    },
    skills:[String],
    experience:{
        title:String,
        company:String,
        startDate:Date,
        endDate:Date,
        description:String,
    },
    education:[{
        school:String,
        feild:String,
        startYear:Date,
        endYear:Date
    }],
    connections:[{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    }]



},{timestamps:true})


const User=mongoose.model("User",userSchema)
export default User