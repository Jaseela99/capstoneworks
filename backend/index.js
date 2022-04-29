//importing express to build REST apis(get,post,put,delete)
const express = require("express")
//cors is used to block different origins
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()
//to restrict access to single origin
var corsOptions = {
  origin: "http://localhost:8081"
  };

mongoose.connect("mongodb+srv://capstone:capstone@cluster0.ae2o2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
app.use(cors(corsOptions))
//data is stored in json format
app.use(express.json())

require("./routers/UserRouter")(app)
require("./routers/InstitutionRouter")(app)
require("./routers/StudentRouter")(app)
require("./routers/TeacherRouter")(app)
app.get("/", (req, res) => {
  res.send("Hello World")
})
//setting port and listening
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


