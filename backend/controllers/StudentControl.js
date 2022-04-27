const Student = require("../Models/StudentModel");
const Institution = require("../Models/InstitutionModel");
const User = require("../Models/UserModel");
const StudentControl = {
  getStudentById: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.status(200).json({
        success: true,
        student,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  createStudent: async (req, res) => {
    try {
      const {userName,email} = req.body;
      const student = new Student({
        userName:userName,
        email:email,
        institution:req.params.institutionId
      })
      //push id of new student in institution collection
      await Institution.findByIdAndUpdate(req.params.institutionId,{
        $push:{student:student._id}
      })
      await student.save()
      //find email of student in user collcetion and update isStudent to true
      await User.findByIdAndUpdate({email:req.body.email},{isStudent:true})
      res.status(200).json({
        success: true,
        student
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  //update body with id
  updateStudent: async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        student,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  //delete student with id
  deleteStudent: async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message:"student deleted"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  
};

module.exports = StudentControl
