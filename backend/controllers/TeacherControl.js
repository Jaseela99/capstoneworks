const Teacher = require("../Models/TeacherModel");
const Comment = require("../Models/CommentModel");

const TeacherControl = {
  getTeacherById: async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  createTeacher: async (req, res) => {
    try {
      const teacher = await Teacher.create(req.body);
      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  updateTeacher: async (req, res) => {
    try {
      const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  deleteTeacher: async (req, res) => {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  getTeacherByInstitution: async (req, res) => {
    try {
      const teacher = await Teacher.find({ institution: req.params.id });

      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        meassage: err.message,
      });
    }
  },
  createComment: async (req, res) => {
    try {
      const teacher = await Teacher.findByIdAndUpdate(
        req.params.id);
      const comment = new Comment(
        {student:req.userId,
        //teacher:req.params.id,
        text:req.body.text}
        );

        await comment.save();
        teacher.comment.push(comment._id)
        teacher.commentCount += 1;
        res.status(200).json({
        success: true,
        teacher,
        comment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  updateComment: async (req, res) => {
    try {
      const {text} =req.body;
      const fieldsToUpdate={};
      fieldsToUpdate.text =text
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,{
        $set:{...fieldsToUpdate}},{new:true}) 
      res.status(200).json({
        success: true,
        comment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      const comment = await Comment.findById(req.params.commentId);
      await comment.remove();
      const index = teacher.comment.indexOf(comment._id);
      teacher.comment.splice(index, 1)
     teacher.commentCount = teacher.commentCount- 1;
     await teacher.save();
      
      res.status(200).json({
        success: true,
        message:"comment deleted"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
module.exports = TeacherControl;
