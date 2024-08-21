const jwt=require("jsonwebtoken");

const genrateToken=(id)=>{
    console.log("token",id);
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}
console.log(genrateToken);
module.exports=genrateToken;