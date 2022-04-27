const UserControl= require("../controllers/UserControl");

const UserRouter = (app)=>{
    app.post("/register",UserControl.register);
    app.post("/login",UserControl.login);
}
module.exports = UserRouter;