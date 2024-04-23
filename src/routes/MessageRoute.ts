import express from "express"
import { deleteMessage, selectMessage, sendEmail } from "../controllers/Message";

const route = express.Router();

/**
 * @swagger
 * /message/sendMessage:
 *   post:
 *     summary: Send an email message
 *     description: Send an email message with  email , message and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the sender.
 *               message:
 *                 type: string
 *                 description: The content of the email message.
 *               name:
 *                 type: string
 *                 description: The name of the sender.
 *     responses:
 *       200:
 *         description:  message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message sent successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
route.post('/sendMessage', sendEmail)

/**
 * @swagger
 * /message/selectMessage:
 *   get:
 *     summary: Retrieve all messages
 *     description: Retrieve all messages from database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *       404:
 *         description: No messages available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No message available
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
route.get("/selectMessage", selectMessage);

/**
 * @swagger
 * /message/deleteMessage/{id}:
 *   delete:
 *     summary: Delete a message
 *     description: Delete a message bt using id .
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of message to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted successfully
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No message found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
route.delete("/deleteMessage/:id", deleteMessage);

const MessageRoute = module.exports = route
export default MessageRoute