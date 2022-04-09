const mongoose =require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const commentSchema = new mongoose.Schema({
    student:{
        type:ObjectId,
        ref:"Student"
    },
    teacher:{
        type:ObjectId,
        ref:"Teacher"
    },
    text:{
        type:String
    }
},
{
    timestamps:true
}
)

const CommentModel =mongoose.model("Comments",commentSchema)
module.exports = CommentModel