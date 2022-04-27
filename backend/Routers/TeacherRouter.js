const TeacherControl = require("../Controllers/TeacherControl");
const authJwt = require("../middleware/Auth");

const TeacherRouter =(app)=>{
    app.get("/institution/:institutionId/teacher/:id",authJwt.verifyToken,TeacherControl.getTeacherById);
    app.post("/institution/:institutionId/teacher",authJwt.verifyToken,authJwt.isAdmin,TeacherControl.createTeacher);
    app.put("/institution/:institutionId/teacher/:id",authJwt.verifyToken,authJwt.isAdmin,TeacherControl.updateTeacher);
    app.delete("/institution/:institutionId/teacher/:id",authJwt.verifyToken,authJwt.isAdmin,TeacherControl.deleteTeacher);
    app.post("/teacher/:id/comment",authJwt.verifyToken,TeacherControl.createComment);
    app.get("/teacher/:id/comment",authJwt.verifyToken,TeacherControl.getCommentByTeacher);
    app.put("/teacher/:id/comment/:commentId",authJwt.verifyToken,TeacherControl.updateComment)
    app.delete("/teacher/:id/comment/:commentId",authJwt.verifyToken,TeacherControl.deleteComment)
    app.post("/teacher/:id/rating",authJwt.verifyToken,TeacherControl.createRating);
    app.get("/teacher/:id/rating",authJwt.verifyToken,TeacherControl.getRating);
    

}
module.exports = TeacherRouter;