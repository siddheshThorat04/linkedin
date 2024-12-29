import conncetionRequest from "../Models/connectionRequest.model.js";
import User from "../Models/user.model.js";

export const sendConnectionRequest = async (req, res) => {

   try {
      const userId = req.params.id
      const senderId = req.user._id
      if (userId.toSring() === senderId.toSring()) {
         return res.status(400).json({ message: "Cannot send request to yourself" })
      }
      if (req.user.conections.includes(userId)) {
         return res.status(400).json({ message: "Already connected" })
      }
      const exisingReq = await conncetionRequest.findOne({ sender: senderId, receiver: userId, status: "pending" })
      if (exisingReq) {
         return res.status(400).json({ message: "Already sent request" })
      }
      const newReq = await conncetionRequest.create({ sender: senderId, receiver: userId })
      res.json(newReq)

   } catch (error) {
      console.log(`Error in sendConnectionRequest: ${error}`)
      res.status(500).json({ message: "Server Error" })

   }

}
export const accptConnectionRequest = async (req, res) => {

   try {
      const requestId = req.params
      const userId = req.user._id

      const request = conncetionRequest.findById(requestId).populate("sender", "name username ").populate("receiver", "name username ")

      if (!request) {
         return res.status(404).json({ message: "Request not found" })
      }
      if (request.status !== "pending") {
         return res.status(400).json({ message: "Request already accepted" })
      }
      request.status = "accepted"
      await request.save()

      await User.findByIdAndUpdate(userId, {
         $push: { conections: request.receiver._id }
      })
      await User.findByIdAndUpdate(request.sender._id, {
         $push: { conections: request.receiver._id }
      })
      res.json({ message: "Request accepted" })
   } catch (error) {
      console.log(`Error in accptConnectionRequest: ${error}`)
      res.status(500).json({ message: "Server Error" })
   }
}

export const rejectConnectionRequest = async (req, res) => {
   try {
      const requestId = req.params
      const userId = req.user._id
      const request = await conncetionRequest.findById(requestId)
      if (request.receiver._id.toString() !== userId.toString()) {
         return res.status(400).json({ message: "Request not found" })
      }
      if (request.status !== "pending") {
         return res.status(400).json({ message: "Request already Proceed" })

      }
      request.status = "rejected"
      await request.save()
      res.json({ message: "Request rejected" })

   } catch (error) {
      console.log(`Error in rejectConnectionRequest: ${error}`)
      res.status(500).json({ message: "Server Error" })
   }
}
export const getConnections = async (req, res) => {
   try {
      const userId = req.user._id
      const user =await User.findById(userId).populate("connections","name username headline connections")
      res.json(user.connections)

   } catch (error) {
      console.log(`Error in getrequests: ${error}`)
      res.status(500).json({ message: "Server Error" })

   }
}




export const getConnectionRequest= async(req,res)=>{
   try {
      const userId=req.user._id
      const requests=await conncetionRequest.find({receiver:userId,status:"pending"}).populate(
         "sender",
         "name username headline connections"
      )
   } catch (error) {
      
   }
} 

export const removeConnection = async (req, res) => {
   try {
      const myId=req.body._id
      const userId = req.params.id       
      
      await User.findByIdAndUpdate(myId, {
         $pull: { conections: userId }
      })
      await User.findByIdAndUpdate(userId, {
         $pull: { conections: myId }
      })
      res.json({ message: "Connection Removed" })


   } catch (error) {
      console.log(`Problem occured :${error}`)
   }
}
