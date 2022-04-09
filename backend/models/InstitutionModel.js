const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types

const institutionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    teacher:[
        {
            type:ObjectId,
            ref:"Teacher"
        }
    ],
    student:[
        {
            type:ObjectId,
            ref:"Student"
        }
    ]
})

const InstitutionModel = mongoose.model("Institution",institutionSchema)

module.exports = InstitutionModel;