import express from "express"
import mongoose from "mongoose"


interface MessageModel {
    name:  string,
    message: string,
    email: string
}

const MessageSchema = new mongoose.Schema({
    name: {type: String,required:true},
    message: {type: String,required:true},
    email: {type: String,required:true},
})


const MessageModel = mongoose.model("message", MessageSchema)

export default MessageModel