const mongoose = require("mongoose");
//Schema maps to a collection and defines shape of the documents within that collection
const  RoleSchema = new mongoose.Schema({
     roleName: {
        type: String,
        required: true,

    }
})
//model = collection + schema
const Role = mongoose.model("Roles", RoleSchema);
module.exports= Role;