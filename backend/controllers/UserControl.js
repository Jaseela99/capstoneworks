const User = require("../models/UserModel");
const Student = require("../models/StudentModel");
const Role = require("../models/RoleModel");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const UserControl = {
  //when signing up
  register: async (req, res) => {
    try {
      //finding email in database
      const registerUser = await User.findOne({ email: req.body.email }); //findone returns a key value
      //if user already exists
      if (registerUser) {
        return res.status(500).json({
          message: "User already exists",
        });
      }
      //if user does not exist
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        location: req.body.location,
      });
      //if user is admin
      if (req.body.institution) {
        user.institution = req.body.institution;
      }
      //if user is student ,finding email in student collection and boolean is true
      const student = await Student.findOne({ email: req.body.email });
      if (student) {
        user.isStudent = true;
      }
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        //if there is role
        if (req.body.role) {
          //checking  for role in Role collection
          Role.find(
            { name: { $in: req.body.role } }, //role is an array [admin,user] which get stored in name of Role collection
            //roles is what above function returns ie an array
            (err, roles) => {
              //if err then err message
              if (err) {
                res.status(500).json({
                  message: err.message,
                });
                return; //if error the function ends
              }
              //setting role as role is object and and is changed to role id ..either admin or user
              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(500).json({
                    message: err.message,
                  });
                  return;
                }
                //if no error then user is registered
                res.status(200).json({
                  message: "User created successfully",
                  accessToken: token,
                });
              });
            }
          );
        } else {
          //if no role then it is considered as user
          Role.findOne(
            { name: "user" },
            //it is returned in role ie object
            (err, role) => {
              if (err) {
                res.status(500).json({
                  message: err.message,
                });
                return;
              }
              //user .roles is set as an array of user roleId
              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).json({
                    message: err.message,
                  });
                  return;
                }
                res.status(200).json({
                  message: "User  created successfully",
                });
              });
            }
          );
        }
      });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  login: async (req, res) => {
    //finding email in database if it exists
    const users = await User.findOne({ email: req.body.email })
      //from username populate roles and eliminates version
      .populate("roles", "-__v")
      .exec(
        //what returned is stored as user
        (err, user) => {
          res.status(500).json({
            message: err.message,
          });
          if (!user) {
            return res.status(500).json({
              message: "User does not exist",
            });
          }
          //if user ,bcrypt compares the password
          let PasswordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!PasswordIsValid) {
            return res.status(401).json({
              accessToken: null,
              message: "Invalid Password!",
            });
          }
          //if password is valid then token is generated(userid,secret and expiration)
          let token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400,
          })
          let authorities = [];
          //roles are being pushed to authorities
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" +
            user.roles[i].name.toUpperCase());
          }
          res.status(200).json({
            id: user._id,
            userName: user.userName,
            email: user.email,
            location: user.location,
            isStudent: user.isStudent,
            accessToken: token,
            roles: authorities,
          });
        }
      )
  },
};

module.exports = UserControl;