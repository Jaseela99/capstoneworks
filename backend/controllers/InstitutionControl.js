const Institution = require("../models/InstitutionModel")
const Student = require("../models/StudentModel")
const Teacher = require("../models/TeacherModel")
//in object of instructioncontrol {keys : values are functions}
const InstitutionControl ={
    //when signing up
    createInstitution: async (req, res) => {
        //try tests block of code for errors
        try {
            //post req , body:name and location
            //create is a function to create documents in mongoose
            const institution = await Institution.create(req.body);
            res.status(200).json({
                success: true,
                institution
            });
            //catch handle errors if there are any
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    //admin dashboard
    getInstitutionById: async (req, res) => {
        try {
            //findById is a function to find documents by id in mongoose
            const institution = await Institution.findById(req.params.institutionId); //find by id returns the object
            //it returns a promise
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
    //search in user dashboard by name and location
    getInstitutionByName : async(req,res)=>{
        try{
            //find is a function to find all documents matches with selector
            const institution = await Institution.find({name:req.query.name}) //if find it returns an array with objects
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
    //student list in admin dashboard
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
      },
      //teachers list in admin dashboard
      getTeacherByInstitution: async (req, res) => {
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
      //institution list in userboard
      getAllInstitutions: async (req, res) => {
          try{
              const institutions = await Institution.find({});
                res.status(200).json({
                    success:true,
                    institutions
          })
        }catch (err){
            res.status(500).json({
                success:false,
                message:err.message
            })

        }

      },

}
module.exports = InstitutionControl