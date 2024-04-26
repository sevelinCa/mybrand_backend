import { Request, Response } from "express";
import SubModel from "../models/Subscribe";
import transporter from "../config/nodemailer";



export const subscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email)
    const saveEmail = await SubModel.create({
        email:email
    })
    if(saveEmail){
        const sendNotification = await transporter.sendMail({
            from: "ngabosevelin@gmail.com",
            to: email,
            replyTo: "ngaboart123@gmail.com",
            subject: "subscription",
            html: `
            <div style="font-family: 'Courier New', Courier, monospace;display:flex;flex-direction:column;gap:10px">
            <div style="width: 100%; height:20vh;background:#221F2F;display: flex;flex-direction: row;align-items: center;justify-content: center; gap:40px">
                <h1 style="font-family: Arial, Helvetica, sans-serif;color: #FDA640;">My_Brand</h1>
                <h1 style="color: white;">Confirmation subscription</h1>
            </div>
            <div style="display: flex;flex-direction: column;gap: 1px;align-items: center;">
    
                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="green"/>
                </svg>
                <span style="font-family: Arial, Helvetica, sans-serif;font-size: 20px;">Your subscription was successfully added.</span>
                <p style="font-family: Arial, Helvetica, sans-serif; max-width: 500px; text-align: center;">Thank you for subscribing! You'll now receive notifications whenever I post new blogs, updates, and other exciting content. Stay tuned for valuable insights and exclusive offers.</p>
                <div style="font-size: 20px;font-family: sans-serif;">Vist site <a href="https://sevelin-portfolio.netlify.app/" target="_blank" style="color: #FDA640;">Here</a></div>
            </div>
            <div style="width: 100%; height:20vh;background:#221F2F;display: flex;flex-direction: row;align-items: center;justify-content: center;">
                <h1 style="color: white;font-weight: 300; font-size: 18px;">&copy Copyright 2024 All right reserved</h1>
            </div>
        </div>
            
            `
        })
        if(sendNotification){

            res.status(200).json({message:"Subscription Successfully"})
        }

    }
  } catch (error: any) {
   
    res.status(500).json({message: error.message});
  }
};
