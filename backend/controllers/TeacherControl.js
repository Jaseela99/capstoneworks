const Teacher = require("../models/TeacherModel");
const Comment = require("../models/CommentModel");
const Institution = require("../models/InstitutionModel");

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
      const teacher = new Teacher({
        fullName: req.body.fullName,
        email: req.body.email,
        profilePIc: req.body.profilePIc,
        subject: req.body.subject,
        experience: req.body.experience,
        bio:req.body.bio,
        phoneNumber:req.body.phoneNumber,
        institution: req.params.institutionId,
      });
      //pushing teachers id to institution collection
      await Institution.findByIdAndUpdate(req.params.institutionId, {
        $push: { teacher: teacher._id },
      });
      await teacher.save();

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
  //update teacher
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
  //delete teacher
  deleteTeacher: async (req, res) => {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params.id);
      await Institution.findByIdAndUpdate(req.params.institutionId, {
        $pull: { teacher: req.params.id },
      });
      res.status(200).json({
        success: true,
        message:"teacher deleted",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  //adding comment 
  createComment: async (req, res) => {
    try {
      //finding teacher by id
      const teacher = await Teacher.findById(req.params.id);
      //creating comment
      const comment = new Comment({
        student: req.userId,
        teacher: req.params.id,
        text: req.body.text,
      });
      //saving comment
      await comment.save();
      //pushing comment id in comment collection
      teacher.comment.push(comment._id);
      //increasing comment count
      teacher.commentCount += 1;
      await teacher.save()
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
  getCommentByTeacher: async (req, res) => {
    try {
      //finding teacher id in comment model
      const comment = await Comment.find({ teacher: req.params.id });
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

  updateComment: async (req, res) => {
    try {
      //const {text:text}={text:req.body.text}
      const { text } = req.body;
      const fieldsToUpdate = {};
      fieldsToUpdate.text = text;
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {//adds text to filedToUpdate
          $set: { ...fieldsToUpdate },
        },
        { new: true }
      );
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
      //removing comment id
      const teacher = await Teacher.findById(req.params.id);
      const comment = await Comment.findById(req.params.commentId);
      await comment.remove();
      //finding index of comment id
      const index = teacher.comment.indexOf(commentId);
      //removing comment id from teacher comment array
      teacher.comment.splice(index, 1);
      //decreasing comment count
      teacher.commentCount = teacher.commentCount - 1;
      //saving teacher
      await teacher.save();

      res.status(200).json({
        success: true,
        message: "comment deleted",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
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
  createRating: async (req, res) => {
    try {
      //finding teacher by id
      const teacher = await Teacher.findById(req.params.id);
      //adding rating to teacher.rating
      teacher.rating = teacher.rating + req.body.rating;
      //increasing rating count
      teacher.ratingCount = teacher.ratingCount + 1;
      await teacher.save();
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
  getRating: async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      res.status(200).json({
        success: true,
        //average rating = rating / rating count
        average: (teacher.rating / teacher.ratingCount).toFixed(1),
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
