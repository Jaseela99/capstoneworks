
const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
mongoose.connect(
  "mongodb+srv://CAPSTONE:CAPSTONE@cluster0.obwb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("DATABASE CONNECTED");
  }
);

require("./Routers/TeacherRouter")(app)
require("./Routers/InstitutionRouter")(app)
require("./Routers/StudentRouter")(app)

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(3000, () => {
  console.log("server listening on PORT 3000");
});
