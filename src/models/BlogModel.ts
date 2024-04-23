import mongoose from "mongoose";

interface BlogModel {
    title:string,
    description:string,
    imageUrl:string,
    content: string;
    likes:number
  
}

const BlogSchema = new mongoose.Schema<BlogModel>({
    title: {type:String,required: true},
    description: {type:String,required: true},
    imageUrl: {type:String,required: true},
    content: {type:String},
    likes:{type:Number,default:0}
   
})

const BlogModel = mongoose.model("blogs", BlogSchema)
export default BlogModel