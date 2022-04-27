const InstitutionControl = require("../Controllers/InstitutionControl")
const authJwt = require("../middleware/Auth");

const InstitutionRouter = (app)=>{
    app.post("/institution",InstitutionControl.createInstitution);
    app.get("/institution",authJwt.verifyToken,InstitutionControl.getInstitutionByName)
    app.get("/institution/:institutionId",authJwt.verifyToken,InstitutionControl.getInstitutionById)
    app.get("/institution/:institutionId/teachers",authJwt.verifyToken,InstitutionControl.getTeacherByInstitution)
    app.get("/institution/:institutionId/students",authJwt.verifyToken,InstitutionControl.getStudentByInstitution)
    app.get("/institutions",authJwt.verifyToken,InstitutionControl.getInstitutionByLocation)

}

module.exports = InstitutionRouter