import {Request,Response} from "express"
import mongoose from "mongoose"

interface SubscribeModel {
    email: string
}


const SubSchema = new mongoose.Schema<SubscribeModel>({
    email: {type:String}

})

const SubModel = mongoose.model("subscribers", SubSchema)
export default SubModel