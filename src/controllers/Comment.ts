import { Request, response, Response } from "express";
import BlogModel from "../models/BlogModel";
import CommentModel from "../models/Comments";

export const AddComment = async (req: Request, res: Response) => {
  try {
    const { name, comment, blog } = req.body;
    const checkBlog = await BlogModel.findById(blog)
    if(checkBlog){
        const saveComment = await CommentModel.create({
            name: name,
            comment:comment,
            blog:blog
        })

        if(saveComment){
            res.json({message:"Comment Added successfully"})
        }else{
            res.json({message:"Problem in Adding Comment"})

        }
    }else{
        res.json({message:"This Blog No longer available"})
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const selectComment = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const comment = await CommentModel.find({blog:id}).populate('blog')
        if(comment.length > 0){

            res.json({comment:comment})
        }else{
            res.json({comment:"No blogs available"})

        }

        
    } catch (error:any) {
        res.json({message: error.message})
        
    }
}
