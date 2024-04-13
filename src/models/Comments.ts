
import mongoose from "mongoose";


interface CommentModel {
    name:string
    comment:string,
    blog:any

}


const CommentSchema = new mongoose.Schema<CommentModel>({
    name: {type:String},
    comment: {type:String},
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
    }
    
})

const CommentModel = mongoose.model("comments", CommentSchema)
export default CommentModel
