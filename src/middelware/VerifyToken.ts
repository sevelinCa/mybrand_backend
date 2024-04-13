import { Request,Response,NextFunction } from "express"
import jwt, {TokenExpiredError,JsonWebTokenError}  from "jsonwebtoken";

export const VerfiyToken = (req:Request,res:Response,next:NextFunction)=>{
    const BearerToken:any = req.header('authorization')
    const RefreshToken:any = req.header('refresh-token')
    if(typeof BearerToken === "undefined" ){
        res.json({message:"No token Found"})
    }else{
        const token = BearerToken.split(' ')[1];
        if(!token){
            res.json({message:"No Token Found"})
        }
        jwt.verify(token, 'sevelin123' , (err:any,decoded:any)=>{
            if(err instanceof TokenExpiredError){
                
                if(RefreshToken){
                
                    jwt.verify(RefreshToken, "sevelin12345", (err:any,decodedRefresh:any)=>{
                        if(err instanceof TokenExpiredError){
                            res.json({message:"Expired Token"})
                        }else if(err instanceof JsonWebTokenError){
                            res.json({message:"Invalid refresh token"})
                        }else if(err){
                            res.json({message:"error in refreshtken"})
                        }else{
                         
                            const userData = decodedRefresh
                            const newaccesstoken = jwt.sign({user:userData}, "sevelin123", {expiresIn: "30s"});
                            res.setHeader("Authorization", `Bearer ${newaccesstoken}`);
                        
                         
                            (req as any).user = decodedRefresh
                            next()
                         
                        }
                    })
                }
            }else if(err instanceof JsonWebTokenError){
                res.json({message:"Invalid Token"})
            }else if(err){
                res.json({message:"Erro In token"})
            }else{
                next()   
            }
        })
    }
}


