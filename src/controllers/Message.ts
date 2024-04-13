import { Request,Response } from "express"
import transporter from "../config/nodemailer"

export const sendEmail = async(req:Request,res:Response)=>{

    try {
        const {email,message,name}  = req.body
        
        const send = await transporter.sendMail({
            from: "ngabosevelin@gmail.com",
            to: "ngaboart123@gmail.com",
            replyTo: email,
            subject: `message from ${name}`,
            html: `<h1 style="font-size:40px">${message}</h1>`
        })
        if(send){
            res.json({message:"Message successfully"})

        }
    } catch (error:any) {
        res.json({message:error})
        
    }

}