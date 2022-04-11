const TeacherControl = require("../Controllers/TeacherControl");

const TeacherRouter =(app)=>{
    app.get("/institution/:institutionId/teacher/:id",TeacherControl.getTeacherById);
    app.post("/institution/:institutionId/teacher",TeacherControl.createTeacher);
    app.put("/institution/:institutionId/teacher/:id",TeacherControl.updateTeacher);
    app.delete("/institution/:institutionId/teacher/:id",TeacherControl.deleteTeacher);
    app.post("/institution/:institutionId/teacher/:id/comment",TeacherControl.createComment);
    app.get("/institution/:institutionId/teacher/:id/comment",TeacherControl.getCommentByTeacher);
    app.put("/institution/:institutionId/teacher/:id/comment/:commentId",TeacherControl.updateComment)
    app.delete("/institution/:institutionId/teacher/:id/comment/:commentId",TeacherControl.deleteComment)
    app.post("/institution/:institutionId/teacher/:id/rating",TeacherControl.createRating);
    app.get("/institution/:institutionId/teacher/:id/rating",TeacherControl.getRating);
    

}
module.exports = TeacherRouter;