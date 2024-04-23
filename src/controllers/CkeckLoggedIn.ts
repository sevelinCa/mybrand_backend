import { Request,Response } from "express"

export const CheckLoggedIn = async(req:Request,res:Response)=>{
    try {
        res.status(200).json({message: "success"})
     
    } catch (error:any) {
        res.status(500).json({error:error.message})
        
    }

}