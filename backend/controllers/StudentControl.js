const Institution = require("../models/institutionModel")
const User = require("../models/user.model")
const Student = require("../models/studentModel")
//object whose key is name and value is async function
const studentControl = {
  createStudent: async (req, res) => {
    //try tests block of code for errors
    try {
      //username and email are the body and creates a new student
      const { userName, email } = req.body
      const student = new Student({
        userName: userName,
        email: email,
        //params
        institution: req.params.institutionId,
      })
      //Institution collection ,studentid is pushed to the student field
      await Institution.findByIdAndUpdate(req.params.institutionId, {
        $push: { student: student._id },
      })
      await student.save()
      //in user collection we check if there is email id of student and upadate is student as true
      await User.findOneAndUpdate(
        { email: req.body.email },
        { isStudent: true, institution: req.params.institutionId }
      )
      res.status(200).json({
        success: true,
        student,
      })
      //catch handle errors if there are any
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
  },
  getStudentById: async (req, res) => {
    try {
      //it returns an object with student details of the coreesponding student id
      const student = await Student.findById(req.params.id)
      res.status(200).json({
        success: true,
        student,
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
  },
  updateStudent: async (req, res) => {
    try {
      //find the student by id and update the student details
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      res.status(200).json({
        success: true,
        student,
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
  },
  deleteStudent: async (req, res) => {
    try {
      //find the student by id and delete the student
      const student = await Student.findByIdAndDelete(req.params.id)
     //removing student id from student field of institution collection
      await Institution.findByIdAndUpdate(req.params.institutionId, {
        $pull: { student: req.params.id },
      })

      res.status(200).json({
        success: true,
        message: "student deleted",
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
  },
}
module.exports = studentControl
