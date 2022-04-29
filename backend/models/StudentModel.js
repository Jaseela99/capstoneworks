//mongoose connects express to database
const mongoose = require("mongoose");
//type os schema ,our id is stored in this form
const { ObjectId } = mongoose.Schema.Types;
//schema maps to collection and defines the shape of documents
const studentSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  //it has a reference to institution collection
  institution: {
    type: ObjectId,
    ref: "Institution",
  },
  
});
// model= collection + schema
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
