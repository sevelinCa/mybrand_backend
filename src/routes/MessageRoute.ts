import express from "express"
import { sendEmail } from "../controllers/Message";

const route = express.Router();

route.post('/sendEmail', sendEmail)

const MessageRoute = module.exports = route
export default MessageRoute