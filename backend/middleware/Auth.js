//for authentication

const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Role = require('../models/RoleModel');

const verifyToken = (req, res, next) => {
    //token is what we give on the header
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({  message: 'No token provided.' });
    //if token is valid,then verified token is stored in decoded
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'invalid token.' });
        //decoded id is the userId
        req.userId = decoded.id;
        next();
        })
}
//middleware for admin
const isAdmin = (req, res, next) => {
    //userid is stored in user
    User.findById(req.userId).exec((err,user) => {
        if(err){
            res.status(500).json({
                message: err.message
            })
            return
        }
       // if user include user.roles in id
        Role.find(
            {
              _id: { $in: user.roles },
            },
            //which is roles
             (err,roles) => {
              if (err) {
                res.status(500).json({ message: err });
                return;
              }
        //if user and role is admin,then next()
           for(let i=0;i<roles.length;i++){
            if(user.roles[i].name === 'admin'){
                next();
                return
            }
        }
        res.status(403).json({
            message: 'require ADMIN role.'   
        })
        return
    })
    })

}

const AuthJwt = {
    verifyToken,
    isAdmin
}
module.exports=AuthJwt;