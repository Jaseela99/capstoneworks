const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
//schema maps to collection and defines the shape of documents
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    
  },
  location:{
    type:String
  },
  institution:{
    type:String
  },
  role:[{
    type:ObjectId,
    ref:"Roles"
  }]
  ,
  //to know whether user is a student
  isStudent:{
    type:Boolean,
    default:false
  },
  
});
//model = collection with schema
const User = mongoose.model("Users", userSchema);

module.exports = User;
