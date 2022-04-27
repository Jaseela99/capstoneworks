const StudentControl = require("../Controllers/StudentControl")
const authJwt = require("../middleware/Auth");

const StudentRouter=(app)=>{
    app.post("/institution/:institutionId/student",authJwt.verifyToken,StudentControl.createStudent)
    app.get("/institution/:institutionId/student/:id" ,authJwt.verifyToken,authJwt.isAdmin,StudentControl.getStudentById)
    app.put("/institution/:institutionId/student/:id",authJwt.verifyToken,authJwt.isAdmin,StudentControl.updateStudent)
    app.delete("/institution/:institutionId/student/:id",authJwt.verifyToken,authJwt.isAdmin,StudentControl.deleteStudent)
}
module.exports=StudentRouter