const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  teacher: [
    {
      type: ObjectId,
      ref: "Teacher",
    },
  ],
  student: [
    {
      type: ObjectId,
      ref: "Student",
    },
  ],
});

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
