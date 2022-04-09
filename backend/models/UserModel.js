const mongoose = require("mongoose");
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
});
//model = collection with schema
const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
