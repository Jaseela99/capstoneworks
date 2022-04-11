const InstitutionControl = require("../Controllers/InstitutionControl")

const InstitutionRouter = (app)=>{
    app.post("/institution",InstitutionControl.createInstitution);
    app.get("/institution",InstitutionControl.getInstitutionByName)
    app.get("/institution/:institutionId",InstitutionControl.getInstitutionById)//
    app.get("/institution/:institutionId/teachers",InstitutionControl.getTeacherByInstitution)
    app.get("/institution/:institutionId/students",InstitutionControl.getStudentByInstitution)
    app.get("/institutions",InstitutionControl.getInstitutionByLocation)//

}

module.exports = InstitutionRouter