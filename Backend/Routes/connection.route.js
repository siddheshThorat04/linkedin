import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { accptConnectionRequest, getConnectionRequest, getConnections, rejectConnectionRequest, sendConnectionRequest } from "../controllers/connection.controller.js";
import { removeConnection } from "../controllers/connection.controller.js";
const router = express.Router();
router.post('/request/:id',  protectRoute,sendConnectionRequest)
router.put('/accept/:requestId',  protectRoute,accptConnectionRequest)
router.put('/reject/:requestId',  protectRoute,rejectConnectionRequest)
router.get('/requests',  protectRoute,getConnectionRequest)
router.get('/',  protectRoute,getConnections)
router.delete('/:userId',  protectRoute,removeConnection)



export default router