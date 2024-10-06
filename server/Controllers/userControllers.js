const generateToken = require("../config/generateToken");
const UserModel = require("../Models/UserModel/user");
const bcrypt=require("bcrypt");
const UploadOnCloudinary = require("../utils/cloudinary");

exports.registerUser=async(req,res)=>{
  console.log(req.body);
    
  try {
    const {name,email,password,avatar}=req.body;
    if(!name || !email || !password){
       res.status(400)
        throw new Error("All fields are required")
    }
    const userExist=await UserModel.findOne({email});
    if(userExist){
        return res.status(404).json({message:'email already exist'})
    }
    const avatarFile = req.files?.avatar?.[0];
    console.log("avatarlocal",avatarFile);
    if (!avatarFile) {
      return res.status(404).json({ message: "Error in uploading file" });
    }
    
    const avatarlocalpath = avatarFile.path;
    const avatarupload = await UploadOnCloudinary(avatarlocalpath);
    if (!avatarupload || !avatarupload.url) {
      return res.status(404).json({ message: "Avatar not uploaded" });
    }
    const hashPassword=await bcrypt.hash(password,10);
    const newUser=UserModel({
        name,
        email,
        password:hashPassword,
        avatar:avatarupload.url
    })
    await newUser.save();
    res.status(200).json({
        success:true,
        message:"user created successfully",
        newUser,
        token:generateToken(newUser._id)
    })
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

exports.authUser=async(req,res)=>{
  const {email,password}=req.body;
  console.log(req.body);
  try {
    if(!email || !password){
      res.status(400)
      throw new Error("All fields are required")
    }
    const existUser=await UserModel.findOne({email});
    if(!existUser){
      return res.status(409).json({
        success:false,
        message:"User not Exist"
      })
    }
    const matchPassword=await bcrypt.compare(password,existUser.password);
    if(!matchPassword){
      return res.status(409).json({
        success:false,
        message:"Password not matched"
      })
    }
    res.status(200).json({
      success:true,
      message:"logedIn Successfully",
      existUser,
      token: generateToken(existUser._id),
    })
  } catch (error) {
    res.status(500).json({message:error.message || "internal server error"})
  }
}

exports.Allusers = async (req, res) => {
  const keyword = req.query.search; // Get the search parameter from the query
  console.log("Search keyword:", keyword); // Debugging

  // Define the keyword for the query
  const searchCriteria = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
        ],
      }
    : {}; // Use an empty object if no keyword is provided

  try {
    const users = await UserModel.find(searchCriteria).find({ _id: { $ne: req.user._id } });
    console.log("Users found:", users); // Debugging
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log any error
    res.status(500).json({ message: "Server error" });
  }
};

