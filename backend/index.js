//importing express;
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

//to restrict access to single origin
var corsOptions = {
    origin: "http://localhost:8081"
  };
  app.use(cors(corsOptions))

app.use(express.json())
mongoose.connect("mongodb+srv://capstone:capstone@cluster0.ae2o2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
//setting port and listening
const PORT = process.env || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


