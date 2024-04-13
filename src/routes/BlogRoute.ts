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

const router = express.Router();
/**
 * @swagger
 * /blog/selectBlog:
 *   get:
 *     summary: fetch blog
 *     description: fetch blog with all attribute
 *     responses:
 *       200:
 *        description: blog data here
 *   '400':
 *     description: unable blog data here
 */
router.get("/selectBlog", VerfiyToken, selectBlog);
router.post("/addBlog", VerfiyToken, addBlog);
router.get("/singleBlog/:id", VerfiyToken, singleBlog);
router.put("/updateBlog/:id", VerfiyToken, updateBlog);
router.delete("/deleteBlog/:id", VerfiyToken, deleteBlog);
router.post("/addComment", VerfiyToken, AddComment);
router.get("/selectComment/:id", VerfiyToken, selectComment);
router.post("/addLike/:id",addLike);

const BlogRoute = (module.exports = router);
export default BlogRoute;
