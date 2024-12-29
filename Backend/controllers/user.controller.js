import User from "../Models/user.model.js"

export const getUserSuggestions = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select("conncetions")


        const suggestedUsers = await User.find({ _id: { $ne: req.user._id, $nin: currentUser.conncetions } }).select("name headline profilePicture " ).limit(3)
        res.json(suggestedUsers)
    } catch (error) {
        console.log(`Problem occured:${error}`)
    }
}
export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        console.log(`Problem occured:${error}`)
        res.status(500).json({ message: "Server Error" })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const allowedFeilds=["name","username","headline","profilePicture","bannerImage","location","skills","experience","education","connections"]
        const updatedaData={};
        for(const feild of allowedFeilds){
            if(req.body[feild]){
                updatedaData[feild]=req.body[feild]
            }
        }

        const user=await User.findByIdAndUpdate(req.user._id,{$set: updatedaData},{new:true}).select("-password")

        res.json(user)
    } catch (error) {
        console.log(`Error in updating Profile:${error}`)
        res.status(500).json({ message: "Server Error" })
    }
}