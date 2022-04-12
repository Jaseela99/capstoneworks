const Student = require("../Models/StudentModel");
const Institution = require("../Models/InstitutionModel");

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
      const {fullName,email} = req.body;
      const student = new Student({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        institution:req.params.institutionId
      })
      await Institution.findByIdAndUpdate(req.params.institutionId,{
        $push:{student:student._id}
      })
      await student.save()
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
