const TeacherControl = require("../Controllers/TeacherControl");

const TeacherRouter =(app)=>{
    app.get("/institution/:institutionId/teacher/:id",TeacherControl.getTeacherById);
    app.post("/institution/:institutionId/teacher",TeacherControl.createTeacher);
    app.put("/institution/:institutionId/teacher/:id",TeacherControl.updateTeacher);
    app.delete("/institution/:institutionId/teacher/:id",TeacherControl.deleteTeacher);
    app.post("/teacher/:id/comment",TeacherControl.createComment);
    app.get("/teacher/:id/comment",TeacherControl.getCommentByTeacher);
    app.put("/teacher/:id/comment/:commentId",TeacherControl.updateComment)
    app.delete("/teacher/:id/comment/:commentId",TeacherControl.deleteComment)
    app.post("/teacher/:id/rating",TeacherControl.createRating);
    app.get("/teacher/:id/rating",TeacherControl.getRating);
    

}
module.exports = TeacherRouter;