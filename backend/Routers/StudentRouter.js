const StudentControl = require("../controller/studentControl")
//for adding verify token
const AuthJwt = require("../middleware/authJwt")
const StudentRouter = (app) => {
  app.get("/student/:id",AuthJwt.verifyToken, StudentControl.getStudentById)
  //admin can edit add and delete student
  app.post("/institution/:institutionId/student",AuthJwt.verifyToken,AuthJwt.isAdmin, StudentControl.createStudent)
  app.put(
    "/institution/:institutionId/student/:id",AuthJwt.verifyToken,AuthJwt.isAdmin,
    StudentControl.updateStudent
  )
  app.delete(
    "/institution/:institutionId/student/:id",AuthJwt.verifyToken,AuthJwt.isAdmin,
    StudentControl.deleteStudent
  )
  
}

module.exports = StudentRouter

