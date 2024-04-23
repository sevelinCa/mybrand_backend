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
            html: `Your Subscribption was successfully Added`
        })
        if(sendNotification){

            res.status(200).json({message:"Subscription Successfully"})
        }

    }
  } catch (error: any) {
   
    res.status(500).json({message: error.message});
  }
};
