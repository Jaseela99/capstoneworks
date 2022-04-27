const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  profilePic: {
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
  experience:{
    type:String,

  },
  bio:{
    type:String,
  },
  comment:[{
    type:ObjectId,
    ref:"Comments"
  }],
  commentCount:{
    type:Number,
    default:0
  },
  rating:{
      type:Number,
      default:0
  },
  ratingCount:{
    type:Number,
    default:0
  },
  institution:{
    type:ObjectId,
    ref:"Institution"
  }
  
});

const TeacherModel = mongoose.model("Teacher", teacherSchema);
module.exports = TeacherModel;
