import mongoose, { Document, Model } from "mongoose";


interface userModel extends Document{
    username:string,
    email:string,
    password:string,
}

const userSchema = new mongoose.Schema<userModel>({
    username: {type: String,required:true},
    email: {type: String,required:true},
    password: {type: String,reuired:true}

}, {timestamps  :true})

export const userModel = mongoose.model("User", userSchema)
    

