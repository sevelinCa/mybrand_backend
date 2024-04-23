import { Request,Response } from "express"
import transporter from "../config/nodemailer"
import MessageModel from "../models/MessageModel"

export const sendEmail = async(req:Request,res:Response)=>{

    try {
        const {email,message,name}  = req.body
        const saveEmail = await MessageModel.create({
            email: email,
            name: name,
            message: message,

        })
        if(saveEmail){        
        const send = await transporter.sendMail({
            from: "ngabosevelin@gmail.com",
            to: "ngaboart123@gmail.com",
            replyTo: email,
            subject: `message from ${name}`,
            html: `<h1 style="font-size:40px">${message}</h1>`
        })
        if(send){
            res.status(200).json({message:"Message successfully"})

        }
    }
    } catch (error:any) {
        res.status(500).json({message:error})
        
    }

}

export const selectMessage = async(req: Request,res:Response)=>{
    try {
        const Message =  await MessageModel.find();
        if(Message){
            res.status(200).json({message:Message})
        }else{
            res.status(404).json({message:"no message availbale"})
        }

        
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
}

export const deleteMessage = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const findMessage = await MessageModel.findByIdAndDelete(id,{new: true})
        if(findMessage){
            res.status(200).json({message:"deleted successfully"})
        }else{
            res.status(404).json({message:"No message found"})
        }
        
    } catch (error:any) {
        res.status(500).json({message: error.message})
        
    }

}