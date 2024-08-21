const jwt=require('jsonwebtoken');

const UserModel = require('../Models/UserModel/user');

const protect=(async(req,res)=>{
let token;
if(
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
){
    try{
         token=req.headers.authorization.split(" ")[1];
         const decoded= jwt.verify(token,process.env.JWT_SECRET);
         req.user= await UserModel.findById(decoded._id).select("-password")
         next()
    }catch(error){
          res.status(401).json({mesage:"Not Authorized"})
    }
    if(!token){
        res.status(401).json({message:"Not authorized ,no token"})

    }
    
}
})

module.exports=protect;