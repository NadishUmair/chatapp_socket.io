const jwt=require('jsonwebtoken');
const userModel=require("../Models/UserModel");
const UserModel = require('../Models/UserModel/user');

const protect=async(res,res)=>{
let token;
if(
    req.headers.authorization && 
    req.headers.authorization.startWith("Bearer")
){
    try{
         token=req.headers.authorization.split(" ")[1];
         const decoded= jwt.verify(token,process.env.JWT_SECRET);
         req.user= await UserModel.findById(decoded._id).select("-password")
         next()
    }catch(error){
          res.status(401).json({mesage:"Not Authorized"})
    }
    
}
}