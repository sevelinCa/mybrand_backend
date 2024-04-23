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
            res.status(200).json({data:saveComment,message:"Comment Added successfully"})
        }else{
            res.json({message:"Problem in Adding Comment"})

        }
    }else{
        res.json({message:"This Blog No longer available"})
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const selectComment = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const comment = await CommentModel.find({blog:id}).populate('blog')
        if(comment.length > 0){

            res.status(200).json({comment:comment})
        }else{
            res.status(404).json({message:"No Comment Available on This blog"})

        }

        
    } catch (error:any) {
        res.json({message: error.message})
        
    }
}
