import { Request, response, Response } from "express";
import BlogModel from "../models/BlogModel";
import multer, { diskStorage } from "multer";
import path from "path";
import cloudinary from "cloudinary";
import transporter from "../config/nodemailer";
import SubModel from "../models/Subscribe";
import  jwt  from "jsonwebtoken";


cloudinary.v2.config({
  cloud_name: "dbajwnjyd",
  api_key: "897836138214521",
  api_secret: "mHC6gUcP03EO9atkGLRGfNERVHU",
});

const storage = diskStorage({

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "" + Date.now() + "" + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("imageUrl");

interface AuthenticatedRequest extends Request {
  token?: string;
}

export const addBlog = async (req: AuthenticatedRequest, res: Response) => {
 
      upload(req, res, async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error uploading file", error: err });
        }

        try {
          const { title, description,content } = req.body;
          const imageUrl = req.file?.path;

          if (!title || !description || !imageUrl) {
            return res
              .status(400)
              .json({ message: "Title, description, and image are required" });
          }
          const result = await cloudinary.v2.uploader.upload(
            imageUrl,
            {
              folder: "blog_images", 
            }
          );

          const blogData = new BlogModel({
            title,
            description,
            content,
            imageUrl: result.secure_url,
          });
           
          const adding  = await blogData.save();
          if(adding){
            res.status(201).json({ message: "Blog added successfully",blog: blogData });
           
            const selectEmails:any = await SubModel.find()
            if(selectEmails.length >0){

              const emails = selectEmails.map((emailData:any) => emailData.email)
              transporter.sendMail({
                from: "ngabosevelin@gmail.com",
                to: emails.join(', '),
                subject: "new blog added",
                html: `new blog added`
              })
         
             
            }
          }
        } catch (error: any) {
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
      });
    }

export const selectBlog = async (req: Request, res: Response) => {


  try {
    const blogData = await BlogModel.find().sort({_id:-1});
    if (blogData) {
      res.status(200).json({message: "success", blog: blogData});
    } else {
      res.status(404).json({ message: "No Blog Available" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const singleBlog = async ( req: Request,res: Response)=>{
  try {

    const {id} = req.params
    const blog = await BlogModel.findById(id)
    if(blog){
      res.status(200).json({blog: blog})
    }else{
      res.status(404).json({message:"no blog available"})
    }
    
  } catch (error:any) {
    res.status(500).json({ message: error.message });
    
  }
}

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteD = await BlogModel.findByIdAndDelete(id,{new:true});
    if(deleteD){
      res.status(200).json({
        message:"Blog Delete successfully",
      })
    }
    if (!deleteD) {
      res.status(404).json({ message: "No blog found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
   
    const { id } = req.params;
    const checkBlog = await BlogModel.findById(id);

    if (checkBlog) {
      
      
        upload(req, res, async (err) => {
          if (err) {
            return res.status(500).json({ message: "Error uploading file", error: err });
          }

          try {
            const { title, description,content } = req.body;
            const imageUrl:any = req.file?.path;
            let updateData:any
            if(imageUrl){

           

            const result = await cloudinary.v2.uploader.upload(imageUrl, {
              folder: "blog_images",
            });

             updateData = {
              title,
              description,
              content,
              imageUrl: result.secure_url,
            };
          }else{
            updateData = {
              title,
              description,
              content
             
          }
        }
    
            const updatedBlog = await BlogModel.findByIdAndUpdate(id,  updateData, { new: true });

            if (updatedBlog) {
              res.status(200).json({ updatedBlog });
            } else {
              res.status(404).json({ message: "Failed to update blog" });
            }
          } catch (error:any) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
          }
        });
      
    } else {
      res.status(404).json({ message: "No blog available" });
    }
  } catch (error: any) {

    res.status(500).json({ message: error.message });
  }
};


export const addLike = async(req:Request,res:Response)=>{
  try {
    const {action} = req.body
    
    const {id} = req.params
    const blogToLike:any = await BlogModel.findById(id)
    if(action === "like"){

      blogToLike.likes++
    }else{
      if(blogToLike.likes>0){
+
        blogToLike.likes--    
      }
    }

    await blogToLike.save()
    res.status(200).json({message: "success"})
 
  } catch (error:any) {
    res.status(500).json({messsage:error.message})
    
  }
}

