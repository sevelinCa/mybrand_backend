import mongoose from "mongoose";

interface BlogModel {
    title:string,
    description:string,
    imageUrl:string,
    likes:number
  
}

const BlogSchema = new mongoose.Schema<BlogModel>({
    title: {type:String},
    description: {type:String},
    imageUrl: {type:String},
    likes:{type:Number,default:0}
   
})

const BlogModel = mongoose.model("blogs", BlogSchema)
export default BlogModel