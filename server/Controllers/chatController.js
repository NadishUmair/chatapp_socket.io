

exports.accessChat=async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        res.status(400).json({message:"user not exist"})
    }
}