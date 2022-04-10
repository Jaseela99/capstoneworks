const Institution = require("../Models/InstitutionModel")

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
    

}
module.exports = InstitutionControl