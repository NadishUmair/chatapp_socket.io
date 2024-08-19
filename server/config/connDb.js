const mongoose=require('mongoose');
const mongo_uri=process.env.MONGO_URI;
console.log(mongo_uri);
const ConnectDB=async()=>{
  mongoose.connect(mongo_uri).then(()=>{
  console.log("Database connected Successfully")
  }).catch((error)=>{
   console.log("Error in connecting Database",error);
  })
}

module.exports=ConnectDB;