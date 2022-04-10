const Student = require("../Models/StudentModel");

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
      const student = await Student.create(req.body);
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
        student,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  getStudentByInstitution: async (req, res) => {
    try {
      const student = await Student.find({ institution: req.params.id });
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
};

module.exports = StudentControl
