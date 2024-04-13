import { Request,Response } from "express"

export const CheckLoggedIn = async(req:Request,res:Response)=>{
    try {
        res.json({message: "success"})
     
    } catch (error:any) {
        res.json({error:error.message})
        
    }

}