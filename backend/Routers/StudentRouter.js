const StudentControl = require("../Controllers/StudentControl")

const StudentRouter=(app)=>{
    app.post("/institution/:institutionId/student",StudentControl.createStudent)
    app.get("/institution/:institutionId/student/:id" ,StudentControl.getStudentById)
    app.put("/institution/:institutionId/student/:id",StudentControl.updateStudent)
    app.delete("/institution/:institutionId/student/:id",StudentControl.deleteStudent)
}
module.exports=StudentRouter