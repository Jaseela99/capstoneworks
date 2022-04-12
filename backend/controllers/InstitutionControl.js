const Institution = require("../Models/InstitutionModel")
const Student = require("../Models/StudentModel")
const Teacher = require("../Models/TeacherModel")

const InstitutionControl ={
    createInstitution: async (req, res) => {
        try {
            const institution = await Institution.create(req.body);
            res.status(200).json({
                success: true,
                institution
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    getInstitutionById: async (req, res) => {
        try {
            const institution = await Institution.findById(req.params.institutionId);
            res.status(200).json({
                success: true,
                institution,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    getInstitutionByName : async(req,res)=>{
        try{
            const institution = await Institution.find({name:req.query.name})
            res.status(200).json({
                success:true,
                institution
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    },
    getInstitutionByLocation : async(req,res)=>{
        try{
            const institution = await Institution.find({location:req.query.location})
            res.status(200).json({
                success:true,
                institution
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    },
    getStudentByInstitution: async (req, res) => {
        try {
          const student = await Student.find({ institution: req.params.institutionId});
          res.status(200).json({
            success: true,
            student,
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      },getTeacherByInstitution: async (req, res) => {
        try {
          const teacher = await Teacher.find({ institution: req.params.institutionId });
    
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
    

}
module.exports = InstitutionControl