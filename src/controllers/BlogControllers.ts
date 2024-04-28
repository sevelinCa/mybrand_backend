import { Request, response, Response } from "express";
import BlogModel from "../models/BlogModel";
import multer, { diskStorage } from "multer";
import path from "path";
import cloudinary from "cloudinary";
import transporter from "../config/nodemailer";
import SubModel from "../models/Subscribe";
import  jwt  from "jsonwebtoken";
import { io } from "../index";


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
                html: `
                <div style="font-family: Arial, sans-serif; margin: 0; padding: 10px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">New Blog Post Notification</h1>
        <img src="${blogData.imageUrl}" alt="Blog Image" style="width: 100%; max-width: 400px; height: auto; margin-bottom: 20px; border-radius: 5px;">
        <h2 style="font-size: 24px; margin-bottom: 10px;">${blogData.title}</h2>
        <p style="color: #666;">Hello there!</p>
        <p style="color: #666;">We're excited to inform you that a new blog post has been added to our website.</p>
        <p style="color: #666;">Check it out now:</p>
        <a href="https://sevelin-portfolio.netlify.app/openedblog?id=${adding._id}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Read Blog Post</a>
        <p style="color: #666;">If you have any questions or feedback, feel free to reply to this email.</p>
        <p style="color: #666;">Thank you for being a valued subscriber!</p>
        <p style="color: #666;">Best Regards,<br>My_Brand</p>
    </div>
</div>

                `
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
    io.emit("likeUpdate", {blogId: id,likes: blogToLike.likes})
    res.status(200).json({message: "success"})
 
  } catch (error:any) {
    res.status(500).json({messsage:error.message})
    
  }
}

