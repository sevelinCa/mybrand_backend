import express from "express";
import {
  addBlog,
  addLike,
  deleteBlog,
  selectBlog,
  singleBlog,
  updateBlog,
} from "../controllers/BlogControllers";
import { VerfiyToken } from "../middelware/VerifyToken";
import { AddComment, selectComment } from "../controllers/Comment";
import { selectMessage } from "../controllers/Message";

const router = express.Router();
/**
 * @swagger
 * /blog/addBlog:
 *   post:
 *     summary: adding blogs
 *     description: adding blog with blog title description and image
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Refresh-Token
 *         in: header
 *         description: Refresh token
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My journey at ALTP
 *               description:
 *                 type: string
 *                 example: lorem ipusm here
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: adding blog successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example:  my journey
 *                     description:
 *                       type: string
 *                       example: lorem ipsum,
 *                     imageUrl:
 *                       type: string
 *                       example: http://cloudinaryhajas
 *       500:
 *         description: something wrong   
 *         content:
 *           application/json:
 *             type: object
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server error
 *       400:
 *         description: somethong wrong with your request
 *         content:
 *           application/json:
 *             type: object
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Title, description, and image are required            
 *
 */
router.post("/addBlog",VerfiyToken, addBlog);

/**
 * @swagger
 * /blog/selectBlog:
 *   get:
 *     summary: get blogs
 *     description: getting  all blogs from backend
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: success
 *                   blog:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: my first blog
 *                       description:
 *                         type: string
 *                         example: lorem ipsum
 *                       imageUrl:
 *                         type: string
 *                         example: http://cludinajaha,has.jpg
 *       404:
 *         description: no blog found
 *         content:
 *           application/json:
 *             type: object
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no blog available now
 *            
 */
router.get("/selectBlog", selectBlog);

/**
 * @swagger
 * /blog/singleBlog/{id}:
 *   get:
 *     summary: get single blog
 *     description: select single blog by using id as parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: add id of blog you want to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog post
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *                 type: string
 *                 example: no blog available
 *       404:
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog post not found
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
router.get("/singleBlog/:id", singleBlog);


/**
 * @swagger
 * /blog/updateBlog/{id}:
 *   put:
 *     summary: Update a blog post
 *     description: update a blog post with id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the blog post to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *       404:
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No blog available
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

router.put("/updateBlog/:id", VerfiyToken, updateBlog);

/**
 * @swagger
 * /blog/deleteBlog/{id}:
 *   delete:
 *     summary: delete blog 
 *     description: delete blog by using its id.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of blog you want to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog deleted successfully
 *       404:
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No blog found
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
router.delete("/deleteBlog/:id", deleteBlog);

/**
 * @swagger
 * /blog/addComment:
 *   post:
 *     summary: Add a comment to a blog 
 *     description: Add a comment to single  blog .
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the commenter.
 *               comment:
 *                 type: string
 *                 description: comment text.
 *               blog:
 *                 type: string
 *                 description: the id of blog .
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *                 message:
 *                   type: string
 *                   example: Comment added successfully
 *       404:
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This Blog doesn't exist
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
router.post("/addComment", AddComment);

/**
 * @swagger
 * /blog/selectComment/{id}:
 *   get:
 *     summary: Get comments fo blog
 *     description: getting comment with one blog by using id .
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of blog
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: getting comment successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No comments available for this blog post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No Comment Available on This blog
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
router.get("/selectComment/:id", selectComment);

/**
 * @swagger
 * /blog/addLike/{id}:
 *   put:
 *     summary: Add or remove a like from a blog post
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of blog
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: action to know if you are liking .
 *     responses:
 *       200:
 *         description: Like added/removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
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
router.post("/addLike/:id", addLike);

const BlogRoute = (module.exports = router);
export default BlogRoute;
