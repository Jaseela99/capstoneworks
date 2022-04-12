const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const studentSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  institution: {
    type: ObjectId,
    ref: "Institution",
  },
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel;
