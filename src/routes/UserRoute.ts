import express, { Router } from "express";
const router: Router = express.Router();
import {
  login,
  register,
  updateProfile,
  userInformation,
  usersAccount,
} from "../controllers/UserController";
import { CheckLoggedIn } from "../controllers/CkeckLoggedIn";
import { VerfiyToken } from "../middelware/VerifyToken";
import { subscribe } from "../controllers/Subscribe";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     description: Register a new user with provided email, username, and password.
 *     security:
 *       - BearerAuth: []
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
 *                       example: ruti@gmail.com
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: admin login
 *     description: login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login successfully
 *         content:
 *           application/json:
 *             type: object
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: gatore@gmail.com
 *                     password:
 *                       type: string
 *                       example: s@23h7399dus7
 *       500:
 *         description: login failed
 *         content:
 *           application/json:
 *             type: object
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid email or password
 */
router.post("/login", login);

router.post("/check", VerfiyToken, CheckLoggedIn);

/**
 * @swagger
 * /auth/subscribe:
 *   post:
 *     summary: subscribe to my brand
 *     describltion: adding your email to subscribe in order to see notification when i post new blog
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ngaboart123@gmail.com
 *     responses:
 *       200:
 *         description: subscription added success check your email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subscription Successfully
 *       500:
 *         description: "There is something wrong here"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something wrong
 */
router.post("/subscribe", subscribe);

/**
 * @swagger
 * /auth/updateProfile:
 *   post:
 *     summary: Update user profile
 *     description: Update user profile with email and username.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: mucyo@gmail.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Updated successfully
 *       404:
 *         description: Sorry, no user found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sorry no user found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.put("/updateProfile", VerfiyToken, updateProfile);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user information
 *     description: Retrieve information about the logged in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60fjg3f289gh
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     email:
 *                       type: string
 *                       example: ivan@gmail.com                 
 *       404:
 *         description: No user found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no user found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.get("/profile", VerfiyToken, userInformation);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all user accounts
 *     description: getting all user from database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User accounts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60f42d06a501b63f289ffdb2
 *                       username:
 *                         type: string
 *                         example: john_doe
 *                       email:
 *                         type: string
 *                         example: josue@gmail.com
 *       404:
 *         description: No user accounts found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no user found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.get("/users", VerfiyToken, usersAccount);

const UserRoute = (module.exports = router);
export default UserRoute;
