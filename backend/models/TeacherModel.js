const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  subject: {
    type: String,
    
  },
  comment:[{
    type:ObjectId,
    ref:"Comments"
  }],
  commentCount:{
    type:Number,
    default:0
  },
  rating:
    {
      type:Number,
    }
  ,
});

const TeacherModel = mongoose.model("Teacher", teacherSchema);
module.exports = TeacherModel;
