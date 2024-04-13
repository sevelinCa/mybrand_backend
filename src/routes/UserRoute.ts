import express, { Router } from "express";
const router: Router = express.Router();
import { login, register } from "../controllers/UserController";
import { CheckLoggedIn } from "../controllers/CkeckLoggedIn";
import { VerfiyToken } from "../middelware/VerifyToken";
import { subscribe } from "../controllers/Subscribe";


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     description: Register a new user with provided email, username, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Created Successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 604d5b16b7e05b19c4c401b8
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     username:
 *                       type: string
 *                       example: user123
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-12T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-12T10:30:00.000Z"
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email, username, and password are required fields.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post("/register", register);


router.post("/login", login);
router.post("/check", VerfiyToken, CheckLoggedIn);
router.post("/subscribe", subscribe);

const UserRoute = (module.exports = router);
export default UserRoute;
